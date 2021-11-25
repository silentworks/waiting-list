exports.up = async (client) => {
	await client`
    create table public.waiting_list (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      full_name VARCHAR NOT NULL,
      email VARCHAR UNIQUE  NOT NULL,
      invited_at TIMESTAMPTZ,
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
      updated_at TIMESTAMPTZ
    )
  `
  await client`alter table public.waiting_list enable row level security;`
}

exports.down = async (client) => {
  await client`alter table public.waiting_list disable row level security;`
	await client`drop table if exists public.waiting_list`
}
