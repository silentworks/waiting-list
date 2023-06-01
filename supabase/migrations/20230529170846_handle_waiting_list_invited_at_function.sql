create function public.handle_waiting_list_invited_at()
returns trigger as $$
begin
	IF ((NEW.raw_user_meta_data->>'waiting_list_id')::uuid is null) THEN
		RETURN NULL;
	ELSE
		UPDATE public.waiting_list
		SET invited_at = NOW(),
				updated_at = NOW()
		WHERE id = (NEW.raw_user_meta_data->>'waiting_list_id')::uuid;
		RETURN NEW;
	END IF;
end;
$$ language plpgsql security definer;


create trigger on_invite_sent
	after insert on auth.users
	for each row execute procedure public.handle_waiting_list_invited_at();