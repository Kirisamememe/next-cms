-- Add version column (initially nullable)
ALTER TABLE "article_atom" ADD COLUMN "version" INTEGER;

-- Update existing records with version numbers
WITH
    numbered_atoms AS (
        SELECT id, ROW_NUMBER() OVER (
                PARTITION BY
                    article_id
                ORDER BY created_at
            ) as calculated_version
        FROM "article_atom"
    )
UPDATE "article_atom"
SET
    version = numbered_atoms.calculated_version
FROM numbered_atoms
WHERE
    article_atom.id = numbered_atoms.id;

-- Make version column NOT NULL after populating data
ALTER TABLE "article_atom" ALTER COLUMN "version" SET NOT NULL;

ALTER TABLE "article_atom" ALTER COLUMN "version" SET DEFAULT 1000;

CREATE UNIQUE INDEX "article_atom_article_id_version_key" ON "article_atom" ("article_id", "version");

-- Create trigger function
CREATE OR REPLACE FUNCTION set_version()
RETURNS TRIGGER AS $$
BEGIN
  NEW.version = (
    SELECT COALESCE(MAX(version), 0) + 1
    FROM article_atom
    WHERE article_id = NEW.article_id
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger
CREATE TRIGGER set_version_trigger BEFORE
INSERT
    ON article_atom FOR EACH ROW
EXECUTE FUNCTION set_version ();