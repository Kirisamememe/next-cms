-- CreateFunction
CREATE OR REPLACE FUNCTION update_media_folder_path()
RETURNS TRIGGER AS $$
BEGIN
  NEW.path = CASE 
    WHEN NEW.parent_path IS NULL THEN NEW.name 
    ELSE concat(NEW.parent_path, '/', NEW.name)
  END;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- CreateTrigger
CREATE TRIGGER media_folder_path_trigger BEFORE INSERT
OR
UPDATE ON media_folder FOR EACH ROW
EXECUTE FUNCTION update_media_folder_path ();