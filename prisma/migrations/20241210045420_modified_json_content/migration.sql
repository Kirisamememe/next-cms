/*
  Warnings:

  - You are about to drop the column `description` on the `json_content` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `json_content` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `json_content` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updated_at` to the `json_content_category` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "json_atom" ADD COLUMN     "description" TEXT,
ADD COLUMN     "title" TEXT;

-- AlterTable
ALTER TABLE "json_content" DROP COLUMN "description",
DROP COLUMN "title",
ADD COLUMN     "admin_only" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "author_note" TEXT,
ADD COLUMN     "permission_level" INTEGER NOT NULL DEFAULT 3,
ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "json_content_category" ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "json_content_slug_key" ON "json_content"("slug");
