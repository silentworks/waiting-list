create type "auth"."code_challenge_method" as enum ('s256', 'plain');

create table "auth"."flow_state" (
    "id" uuid not null,
    "user_id" uuid,
    "auth_code" text not null,
    "code_challenge_method" auth.code_challenge_method not null,
    "code_challenge" text not null,
    "provider_type" text not null,
    "provider_access_token" text,
    "provider_refresh_token" text,
    "created_at" timestamp with time zone,
    "updated_at" timestamp with time zone
);


CREATE UNIQUE INDEX flow_state_pkey ON auth.flow_state USING btree (id);

CREATE INDEX idx_auth_code ON auth.flow_state USING btree (auth_code);

CREATE INDEX refresh_token_session_id ON auth.refresh_tokens USING btree (session_id);

alter table "auth"."flow_state" add constraint "flow_state_pkey" PRIMARY KEY using index "flow_state_pkey";

set check_function_bodies = off;

create or replace view "auth"."audit_log_entry_details" as  SELECT a.id,
    a.created_at,
    a.ip_address,
    t.action,
    t.actor_id,
    COALESCE(t.actor_name, (u.email)::text) AS actor_name,
    COALESCE(t.actor_user_name, (u.email)::text) AS actor_user_name,
    u.email,
    t.log_type,
    t."timestamp" AS action_at,
    date_trunc('year'::text, t."timestamp") AS action_year_on,
    date_trunc('quarter'::text, t."timestamp") AS action_quarter_on,
    date_trunc('month'::text, t."timestamp") AS action_month_on,
    date_trunc('week'::text, t."timestamp") AS action_week_on,
    date_trunc('day'::text, t."timestamp") AS action_day_on,
    EXTRACT(isodow FROM t."timestamp") AS action_day_of_week,
    to_char(t."timestamp", 'DAY'::text) AS action_day_name,
    u.last_sign_in_at
   FROM ((auth.audit_log_entries a
     CROSS JOIN LATERAL json_to_record(a.payload) t(action text, actor_id uuid, actor_name text, actor_user_name text, log_type text, "timestamp" timestamp without time zone))
     JOIN auth.users u ON ((u.id = t.actor_id)));


CREATE OR REPLACE FUNCTION auth.email()
 RETURNS text
 LANGUAGE sql
 STABLE
AS $function$
  select 
  	coalesce(
		nullif(current_setting('request.jwt.claim.email', true), ''),
		(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'email')
	)::text
$function$
;

CREATE OR REPLACE FUNCTION auth.role()
 RETURNS text
 LANGUAGE sql
 STABLE
AS $function$
  select 
  	coalesce(
		nullif(current_setting('request.jwt.claim.role', true), ''),
		(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'role')
	)::text
$function$
;

CREATE OR REPLACE FUNCTION auth.uid()
 RETURNS uuid
 LANGUAGE sql
 STABLE
AS $function$
  select 
  	coalesce(
		nullif(current_setting('request.jwt.claim.sub', true), ''),
		(nullif(current_setting('request.jwt.claims', true), '')::jsonb ->> 'sub')
	)::uuid
$function$
;

CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_new_profile();

CREATE TRIGGER on_invite_sent AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION handle_waiting_list_invited_at();


