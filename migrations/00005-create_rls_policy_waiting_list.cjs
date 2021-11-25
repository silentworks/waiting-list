exports.up = async client => {
	await client`
    CREATE POLICY "Allow select for admin users only" 
    ON public.waiting_list 
    FOR SELECT USING (
      is_admin(auth.uid())
    );`

	await client`
    CREATE POLICY "Allow insert for all users" 
    ON public.waiting_list 
    FOR INSERT WITH CHECK (true);`
  
	await client`
    -- update policy
    CREATE POLICY "Allow update for admin users only" 
    ON public.waiting_list 
    FOR UPDATE USING (
      is_admin(auth.uid())
    );`
  
	await client`
    -- delete policy
    CREATE POLICY "Allow delete for admin users only" 
    ON public.waiting_list 
    FOR DELETE USING (
      is_admin(auth.uid())
    );`
};

exports.down = async client => {
	await client`DROP POLICY IF EXISTS "Allow select for admin users only" ON public.waiting_list`
	await client`DROP POLICY IF EXISTS "Allow insert for all users" ON public.waiting_list`
	await client`DROP POLICY IF EXISTS "Allow update for admin users only" ON public.waiting_list`
	await client`DROP POLICY IF EXISTS "Allow delete for admin users only" ON public.waiting_list`
};