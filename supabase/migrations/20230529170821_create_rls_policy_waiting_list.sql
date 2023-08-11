CREATE POLICY "Allow select for admin users only" 
ON public.waiting_list 
FOR SELECT USING (
	is_admin(auth.uid())
);


CREATE POLICY "Allow insert for all users" 
ON public.waiting_list 
FOR INSERT WITH CHECK (true);


-- update policy
CREATE POLICY "Allow update for admin users only" 
ON public.waiting_list 
FOR UPDATE USING (
	is_admin(auth.uid())
);


-- delete policy
CREATE POLICY "Allow delete for admin users only" 
ON public.waiting_list 
FOR DELETE USING (
	is_admin(auth.uid())
);
