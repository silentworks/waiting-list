exports.up = async (client) => {
	await client`
    create table public.profiles (
      id uuid PRIMARY KEY REFERENCES auth.users NOT NULL,
      full_name VARCHAR NULL,
      is_admin BOOL DEFAULT FALSE,
      created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
      updated_at TIMESTAMPTZ
    )
  `
  await client`alter table public.profiles enable row level security;`
}

exports.down = async (client) => {
  await client`alter table public.profiles disable row level security;`
	await client`drop table if exists public.profiles`
}
