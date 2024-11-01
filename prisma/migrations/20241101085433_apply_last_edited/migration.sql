/*
  Warnings:

  - Made the column `last_edited_by` on table `article` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "article" DROP CONSTRAINT "article_last_edited_by_fkey";

-- AlterTable
ALTER TABLE "article" ALTER COLUMN "last_edited_by" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_last_edited_by_fkey" FOREIGN KEY ("last_edited_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
