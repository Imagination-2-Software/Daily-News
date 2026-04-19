import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { ADMIN_COOKIE, assertSameOrigin, verifyAdminToken } from '@/lib/admin-auth';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Manual pipeline trigger.
 *
 * Two modes:
 *   1. PRODUCTION (Vercel / any serverless): triggers the GitHub Actions
 *      daily-blog workflow via `workflow_dispatch`. Requires:
 *        - GITHUB_TOKEN       (fine-grained PAT with "Actions: read/write")
 *        - GITHUB_OWNER
 *        - GITHUB_REPO
 *        - GITHUB_WORKFLOW    (workflow filename, default: daily-blog.yml)
 *
 *   2. LOCAL DEV fallback: if the GitHub env vars aren't set, spawn the
 *      script directly as a child process. Fast iteration without touching
 *      the Actions API.
 *
 * Protected by:
 *   - admin session cookie
 *   - same-origin CSRF check
 */
export async function POST(request: Request) {
  // AuthN
  const jar = await cookies();
  const token = jar.get(ADMIN_COOKIE)?.value;
  if (!(await verifyAdminToken(token))) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // CSRF
  const csrfRejection = assertSameOrigin(request);
  if (csrfRejection) return csrfRejection;

  const ghToken = process.env.GITHUB_TOKEN;
  const ghOwner = process.env.GITHUB_OWNER;
  const ghRepo = process.env.GITHUB_REPO;
  const ghWorkflow = process.env.GITHUB_WORKFLOW || 'daily-blog.yml';
  const ghRef = process.env.GITHUB_WORKFLOW_REF || 'main';

  const isDev = process.env.NODE_ENV !== 'production';

  // Prod path: GitHub workflow_dispatch
  if (ghToken && ghOwner && ghRepo) {
    const url = `https://api.github.com/repos/${ghOwner}/${ghRepo}/actions/workflows/${ghWorkflow}/dispatches`;
    let githubError: string | null = null;
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `Bearer ${ghToken}`,
          'X-GitHub-Api-Version': '2022-11-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ref: ghRef }),
      });
      if (res.ok) {
        return NextResponse.json({
          started: true,
          mode: 'workflow_dispatch',
          workflow: ghWorkflow,
          ref: ghRef,
        });
      }
      const body = await res.text();
      githubError = `GitHub API returned ${res.status}: ${body.slice(0, 400)}`;
    } catch (err) {
      githubError = `Failed to reach GitHub: ${(err as Error).message}`;
    }

    // In production we surface the GitHub failure — the operator should know.
    if (!isDev) {
      return NextResponse.json({ error: githubError }, { status: 502 });
    }
    // In dev, GitHub creds are often dummy placeholders. Fall through to the
    // local spawn path so Run Now still does something useful.
    console.warn(`[automation] GitHub dispatch failed in dev, falling back to local spawn: ${githubError}`);
  }

  // Local fallback: spawn child process
  if (isDev) {
    const cwd = process.cwd();
    const script = path.join(cwd, 'scripts', 'generate-daily-post.ts');
    try {
      const child = spawn('npx', ['tsx', script, '--manual'], {
        cwd,
        env: process.env,
        detached: true,
        stdio: 'ignore',
      });
      child.unref();
      return NextResponse.json({ started: true, mode: 'local-spawn', pid: child.pid });
    } catch (err) {
      return NextResponse.json({ error: (err as Error).message }, { status: 500 });
    }
  }

  // Prod + no GitHub env → nothing we can do
  return NextResponse.json(
    {
      error:
        'Automation trigger is not configured. Set GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO in the deployment environment.',
    },
    { status: 503 },
  );
}
