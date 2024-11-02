/*
Warnings:
- Made the column `last_edited_by` on table `article` required. This step will fail if there are existing NULL values in that column.
*/
-- 既存のデータを更新
UPDATE "article"
SET
    "last_edited_by" = "author_id"
WHERE
    "last_edited_by" IS NULL;