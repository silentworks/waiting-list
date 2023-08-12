create table if not exists public.profiles (
	id uuid PRIMARY KEY REFERENCES auth.users NOT NULL,
	full_name VARCHAR NULL,
	is_admin BOOL DEFAULT FALSE,
	created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
	updated_at TIMESTAMPTZ
);

alter table public.profiles enable row level security;