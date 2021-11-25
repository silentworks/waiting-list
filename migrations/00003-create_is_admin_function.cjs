exports.up = async client => {
	await client`
  -- admin check with boolean
  create function public.is_admin(user_id uuid)
  returns boolean as $$
  declare
    admin int;
  begin
    select count(*)
    from public.profiles
    where profiles.is_admin
    and profiles.id = is_admin.user_id
    into admin;
    
    return admin > 0;
  end;
  $$ language plpgsql security definer;
  `
};

exports.down = async client => {
	await client`drop function if exists public.is_admin(user_id uuid);`
};
