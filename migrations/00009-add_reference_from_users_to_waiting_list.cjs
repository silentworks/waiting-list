exports.up = async client => {
	await client`
		alter table waiting_list
			add column profile_id uuid;
	`

	await client`
		alter table waiting_list 
			add constraint waiting_list_id_fkey
				foreign key (profile_id) 
				references profiles (id) 
				on delete cascade;
	`

	// Replace handle waiting list function with additional profile_id entry
	await client`
		create or replace function public.handle_waiting_list_invited_at()
		returns trigger as $$
		begin
			IF ((NEW.raw_user_meta_data->>'waiting_list_id')::uuid is null) THEN
				RETURN NULL;
			ELSE
				UPDATE public.waiting_list
				SET profile_id = new.id,
						invited_at = NOW(),
						updated_at = NOW()
				WHERE id = (NEW.raw_user_meta_data->>'waiting_list_id')::uuid;
				RETURN NEW;
			END IF;
		end;
		$$ language plpgsql security definer;
	`
};

exports.down = async client => {
	await client`alter table waiting_list drop column profile_id`

	await client`
    create or replace function public.handle_waiting_list_invited_at()
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
  `
};
