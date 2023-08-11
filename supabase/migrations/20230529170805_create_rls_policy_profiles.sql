CREATE POLICY "Allow select for admin users or own profile only" 
ON public.profiles 
FOR SELECT USING (
	is_admin(auth.uid()) or auth.uid() = id
);

CREATE POLICY "Allow insert for own profile only" 
ON public.profiles 
FOR INSERT WITH CHECK (auth.uid() = id);

-- update policy
CREATE POLICY "Allow update for own profile only" 
ON public.profiles 
FOR UPDATE USING (auth.uid() = id);

-- delete policy
CREATE POLICY "Allow delete for own profile only" 
ON public.profiles 
FOR DELETE USING (auth.uid() = id);

