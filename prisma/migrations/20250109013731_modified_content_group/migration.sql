/*
  Warnings:

  - Added the required column `author_id` to the `content_group` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_editor_id` to the `content_group` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "content_group" ADD COLUMN     "author_id" INTEGER NOT NULL,
ADD COLUMN     "last_editor_id" INTEGER NOT NULL,
ADD COLUMN     "permission_level" INTEGER NOT NULL DEFAULT 3;

-- AddForeignKey
ALTER TABLE "content_group" ADD CONSTRAINT "content_group_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_group" ADD CONSTRAINT "content_group_last_editor_id_fkey" FOREIGN KEY ("last_editor_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
