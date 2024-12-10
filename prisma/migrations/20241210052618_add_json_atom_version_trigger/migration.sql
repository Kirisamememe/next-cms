-- This is an empty migration.
CREATE OR REPLACE FUNCTION set_json_atom_version()
RETURNS TRIGGER AS $$
BEGIN
  NEW.version = (
    SELECT COALESCE(MAX(version), 0) + 1
    FROM json_atom
    WHERE json_content_id = NEW.json_content_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER set_json_atom_version_trigger BEFORE
INSERT
    ON json_atom FOR EACH ROW
EXECUTE FUNCTION set_json_atom_version ();