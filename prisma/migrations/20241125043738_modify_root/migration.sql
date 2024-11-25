-- This is an empty migration.

UPDATE "media_folder"
SET
    "parent_path" = NULL
WHERE
    "name" = '.';