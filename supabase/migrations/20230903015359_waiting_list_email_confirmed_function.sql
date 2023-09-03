create or replace function public.handle_waiting_list_email_confirmed_at()
returns trigger as $$
begin
	IF (NEW.confirmed_at is not null) THEN
		UPDATE public.waiting_list
		SET email_confirmed_at = NEW.confirmed_at
		WHERE profile_id = (NEW.id)::uuid;
		RETURN NEW;
	END IF;
	RETURN NULL;
end;
$$ language plpgsql security definer;


create or replace trigger on_waiting_list_user_confirmation
	after update on auth.users
	for each row execute procedure public.handle_waiting_list_email_confirmed_at();