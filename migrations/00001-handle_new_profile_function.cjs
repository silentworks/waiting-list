exports.up = async client => {
	await client`
    create function public.handle_new_profile()
    returns trigger as $$
    begin
      insert into public.profiles (id, full_name, is_admin)
      values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'is_admin');
      return new;
    end;
    $$ language plpgsql security definer;
  `

  await client`
    create trigger on_auth_user_created
      after insert on auth.users
      for each row execute procedure public.handle_new_profile();
  `
};

exports.down = async client => {
  // await client`alter user postgres with superuser;`
	await client`drop trigger if exists on_auth_user_created on auth.users;`
	await client`drop function if exists public.handle_new_profile();`
  // await client`alter user postgres with nosuperuser;`
};
