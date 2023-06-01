ALTER TABLE profiles
ADD COLUMN confirmed_at TIMESTAMPTZ;

create function public.handle_admin_user_confirmed_at()
returns trigger as $$
begin
	IF (NEW.confirmed_at is not null) THEN
		UPDATE public.profiles
		SET confirmed_at = NEW.confirmed_at
		WHERE id = (NEW.id)::uuid;
		RETURN NEW;
	END IF;
	RETURN NULL;
end;
$$ language plpgsql security definer;


create trigger on_admin_user_confirmation
	after update on auth.users
	for each row execute procedure public.handle_admin_user_confirmed_at();