exports.up = async client => {
	await client`
		alter table profiles
			drop constraint profiles_id_fkey,
			add constraint profiles_id_fkey
				foreign key (id)
				references auth.users
				on delete cascade;
	`
};

exports.down = async client => {
	await client`alter table profiles drop constraint profiles_id_fkey;`
};
