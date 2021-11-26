exports.up = async client => {
  await client`
    CREATE POLICY "Allow select for admin users or own profile only" 
    ON public.profiles 
    FOR SELECT USING (
      is_admin(auth.uid()) or auth.uid() = id
    );`

	await client`
    CREATE POLICY "Allow insert for own profile only" 
    ON public.profiles 
    FOR INSERT WITH CHECK (auth.uid() = id);`
  
	await client`
    -- update policy
    CREATE POLICY "Allow update for own profile only" 
    ON public.profiles 
    FOR UPDATE USING (auth.uid() = id);`
  
	await client`
    -- delete policy
    CREATE POLICY "Allow delete for own profile only" 
    ON public.profiles 
    FOR DELETE USING (auth.uid() = id);`
};

exports.down = async client => {
  await client`DROP POLICY IF EXISTS "Allow select for admin users or own profile only" ON public.profiles`
	await client`DROP POLICY IF EXISTS "Allow insert for own profile only" ON public.profiles`
	await client`DROP POLICY IF EXISTS "Allow update for own profile only" ON public.profiles`
	await client`DROP POLICY IF EXISTS "Allow delete for own profile only" ON public.profiles`
};