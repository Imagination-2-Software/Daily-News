-- Migration 001 — unify author byline.
--
-- Context: older posts were attributed to rotating fabricated humans
-- ("Marcus Chen", "Dr. Sarah Williams", etc.). We moved to a single
-- team byline ("Infocus-IT Team") for ethical + EEAT reasons. This
-- migration rewrites every existing row to the unified byline.
--
-- Idempotent: safe to re-run. The WHERE clause ensures rows already
-- on the new byline aren't touched (so updated_at doesn't churn).
--
-- Apply from Supabase Studio → SQL Editor.

update public.posts
  set author = 'Infocus-IT Team',
      updated_at = now()
  where author <> 'Infocus-IT Team';

-- Verify — this SELECT is here for convenience. It should return only
-- one row after the UPDATE succeeds.
select author, count(*) as posts
  from public.posts
  group by author
  order by posts desc;
