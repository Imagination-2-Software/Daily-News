import { NextResponse } from 'next/server';
import { spawn } from 'node:child_process';
import path from 'node:path';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

/**
 * Manual pipeline trigger. Fires tsx scripts/generate-daily-post.ts --manual
 * in a detached child process and returns immediately. The script logs its
 * progress into the automation_runs table.
 *
 * Intended for local dev / self-hosted only. Vercel serverless functions
 * can't spawn long-running children — in that environment, trigger the
 * GitHub Actions workflow instead via the `workflow_dispatch` REST API.
 */
export async function POST() {
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
    return NextResponse.json({ started: true, pid: child.pid });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
