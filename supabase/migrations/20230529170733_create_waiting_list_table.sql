create table if not exists public.waiting_list (
	id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
	full_name VARCHAR NOT NULL,
	email VARCHAR UNIQUE NOT NULL,
	email_confirmed_at TIMESTAMPTZ,
	invited_at TIMESTAMPTZ,
	created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
	updated_at TIMESTAMPTZ
);

alter table public.waiting_list enable row level security;