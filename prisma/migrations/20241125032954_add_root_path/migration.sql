/*
Warnings:
- Made the column `folder_path` on table `image_url` required. This step will fail if there are existing NULL values in that column.
- Made the column `parent_path` on table `media_folder` required. This step will fail if there are existing NULL values in that column.
*/

-- pathをparent_path/nameのフォーマットに更新
UPDATE "media_folder" SET "path" = '.' || '/' || "path";

INSERT INTO
    "media_folder" (
        "path",
        "name",
        "created_at",
        "updated_at"
    )
VALUES (
        '.',
        '.',
        CURRENT_TIMESTAMP,
        CURRENT_TIMESTAMP
    )
ON CONFLICT ("path") DO NOTHING;

-- NULLのparent_pathを更新
UPDATE "media_folder"
SET
    "parent_path" = '.'
WHERE
    "parent_path" IS NULL;

-- NULLのfolder_pathを更新
UPDATE "image_url"
SET
    "folder_path" = '.'
WHERE
    "folder_path" IS NULL;

-- NOT NULL制約を追加
ALTER TABLE "image_url" ALTER COLUMN "folder_path" SET NOT NULL;