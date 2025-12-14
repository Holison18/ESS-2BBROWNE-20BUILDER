-- POLICY: Allow authenticated users to UPDATE projects
-- This fixes the issue where updates in the Admin dashboard were being blocked.

-- 1. Ensure RLS is enabled (should already be)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 2. Create the policy for UPDATE
-- Note: 'USING (true)' allows the user to select the row to update.
--       'WITH CHECK (true)' allows the user to save the new values.
CREATE POLICY "Allow authenticated users to update projects"
ON projects
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- 3. (Optional) Ensure INSERT is also covered if not already
-- CREATE POLICY "Allow authenticated users to insert projects"
-- ON projects
-- FOR INSERT
-- TO authenticated
-- WITH CHECK (true);
