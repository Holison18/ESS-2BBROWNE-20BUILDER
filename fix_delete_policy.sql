-- POLICY: Allow authenticated users to DELETE projects
-- This fixes the issue where deletes in the Admin dashboard were being ignored.

-- 1. Ensure RLS is enabled (should already be)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- 2. Create the policy for DELETE
-- Note: 'USING (true)' allows the user to select the row to delete.
CREATE POLICY "Allow authenticated users to delete projects"
ON projects
FOR DELETE
TO authenticated
USING (true);
