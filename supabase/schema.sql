-- =============================================================
-- LEOKOKO — Supabase schema for the fan community chat
-- Run this in Supabase → SQL Editor → New query → Run
-- =============================================================

-- 1. Profiles table (extends auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null,
  avatar_url   text,
  is_anonymous boolean not null default false,
  is_admin     boolean not null default false,
  created_at   timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Profiles are viewable by everyone"
  on public.profiles for select
  using (true);

create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- 2. Messages table (the chat itself)
create table if not exists public.messages (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid not null references public.profiles(id) on delete cascade,
  content     text not null check (char_length(content) between 1 and 1000),
  created_at  timestamptz not null default now(),
  deleted_at  timestamptz
);

create index if not exists messages_created_at_idx
  on public.messages (created_at desc);

alter table public.messages enable row level security;

create policy "Anyone can read non-deleted messages"
  on public.messages for select
  using (deleted_at is null);

create policy "Authenticated users can post"
  on public.messages for insert
  with check (auth.uid() = user_id);

create policy "Users can soft-delete their own messages"
  on public.messages for update
  using (auth.uid() = user_id);

create policy "Admins can delete any message"
  on public.messages for update
  using (
    exists (
      select 1 from public.profiles
      where profiles.id = auth.uid() and profiles.is_admin = true
    )
  );

-- 3. Enable Realtime on messages
alter publication supabase_realtime add table public.messages;

-- 4. Auto-create a profile row whenever a new auth user signs up
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name, is_anonymous)
  values (
    new.id,
    coalesce(
      new.raw_user_meta_data->>'display_name',
      new.raw_user_meta_data->>'full_name',
      'Fan' || substr(new.id::text, 1, 6)
    ),
    coalesce((new.raw_user_meta_data->>'is_anonymous')::boolean, false)
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
