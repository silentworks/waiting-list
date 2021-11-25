exports.up = async client => {
	await client`CREATE POLICY "Enable all actions for users based on user_id" ON public.profiles FOR ALL USING (auth.uid() = id) WITH CHECK (auth.uid() = id);`
};

exports.down = async client => {
	await client`DROP POLICY IF EXISTS "Enable all actions for users based on user_id" ON public.profiles`
};