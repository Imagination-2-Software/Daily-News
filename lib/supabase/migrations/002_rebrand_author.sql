-- Migration 002 — rebrand author byline to Infocus-IT.
--
-- Context: we renamed the display brand from "InFocusIT" (camelCase) to
-- "Infocus-IT" (hyphenated). Posts written before the rename still carry
-- the old team byline. This migration rewrites them.
--
-- Idempotent: safe to re-run. The WHERE clause only touches rows still
-- on the old byline.
--
-- Apply from Supabase Studio → SQL Editor.

update public.posts
  set author = 'Infocus-IT Team',
      updated_at = now()
  where author = 'InFocusIT Team';

-- Verify — should return a single row for 'Infocus-IT Team' after migration.
select author, count(*) as posts
  from public.posts
  group by author
  order by posts desc;
