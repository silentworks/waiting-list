create or replace function public.handle_new_profile()
returns trigger as $$
begin
	insert into public.profiles (id, full_name, is_admin)
	values (new.id, new.raw_user_meta_data->>'full_name', (new.raw_user_meta_data->>'is_admin')::boolean);
	return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
	after insert on auth.users 
	for each row execute procedure public.handle_new_profile();