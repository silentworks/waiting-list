exports.up = async client => {
	await client`alter table public.migrations enable row level security;`
};

exports.down = async client => {
	await client`alter table public.migrations disable row level security;`
};
