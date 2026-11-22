-- Run in Supabase → SQL Editor.
create table if not exists public.guestbook (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users(id) on delete cascade,
  name text not null check (char_length(name) between 1 and 80),
  avatar_url text,
  message text not null check (char_length(message) between 1 and 280),
  created_at timestamptz not null default now()
);

alter table public.guestbook enable row level security;

create policy "anyone can read" on public.guestbook for select using (true);
create policy "signed-in users can post as themselves" on public.guestbook
  for insert to authenticated with check (auth.uid() = user_id);
create policy "authors can delete their own" on public.guestbook
  for delete to authenticated using (auth.uid() = user_id);
