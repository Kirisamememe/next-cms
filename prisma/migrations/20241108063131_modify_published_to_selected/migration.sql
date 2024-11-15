/*
Warnings:
- You are about to drop the column `published_at` on the `article_atom` table. All the data in the column will be lost.
*/
-- AlterTable
ALTER TABLE "article_atom"
RENAME COLUMN "published_at" TO "selected_at";

ALTER TABLE "article_atom"
ALTER COLUMN "selected_at"
SET DEFAULT CURRENT_TIMESTAMP;