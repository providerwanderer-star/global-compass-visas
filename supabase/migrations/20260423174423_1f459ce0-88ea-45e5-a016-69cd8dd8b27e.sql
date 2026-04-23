-- Enable scheduling + HTTP extensions
create extension if not exists pg_cron with schema extensions;
create extension if not exists pg_net with schema extensions;

-- Express Entry draws table
create table if not exists public.express_entry_draws (
  id uuid primary key default gen_random_uuid(),
  draw_number integer not null unique,
  draw_date date not null,
  category text not null,
  crs_min integer not null,
  itas integer not null,
  tie_break date,
  source_url text,
  fetched_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists idx_ee_draws_date on public.express_entry_draws (draw_date desc);
create index if not exists idx_ee_draws_category on public.express_entry_draws (category);

-- PNP draws table
create table if not exists public.pnp_draws (
  id uuid primary key default gen_random_uuid(),
  province text not null,
  province_code text not null,
  stream text not null,
  draw_date date not null,
  invitations integer not null,
  min_score integer,
  notes text,
  source_url text,
  fetched_at timestamptz not null default now(),
  created_at timestamptz not null default now(),
  unique (province_code, stream, draw_date)
);

create index if not exists idx_pnp_draws_date on public.pnp_draws (draw_date desc);
create index if not exists idx_pnp_draws_province on public.pnp_draws (province_code);

-- Enable RLS
alter table public.express_entry_draws enable row level security;
alter table public.pnp_draws enable row level security;

-- Public can read (this is published reference data)
create policy "Public can view EE draws"
  on public.express_entry_draws
  for select
  to anon, authenticated
  using (true);

create policy "Public can view PNP draws"
  on public.pnp_draws
  for select
  to anon, authenticated
  using (true);

-- No INSERT/UPDATE/DELETE policies for public — only service role (used by edge function) can write.