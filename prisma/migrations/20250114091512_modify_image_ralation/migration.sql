/*
  Warnings:

  - You are about to drop the column `image` on the `article_atom` table. All the data in the column will be lost.
  - You are about to drop the `_ContentGroupToImageUrl` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `collection` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ContentGroupToImageUrl" DROP CONSTRAINT "_ContentGroupToImageUrl_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentGroupToImageUrl" DROP CONSTRAINT "_ContentGroupToImageUrl_B_fkey";

-- DropForeignKey
ALTER TABLE "collection" DROP CONSTRAINT "collection_api_id_fkey";

-- AlterTable
ALTER TABLE "article_atom" DROP COLUMN "image",
ADD COLUMN     "image_id" INTEGER;

-- AlterTable
ALTER TABLE "content_group" ADD COLUMN     "image_id" INTEGER;

-- DropTable
DROP TABLE "_ContentGroupToImageUrl";

-- DropTable
DROP TABLE "collection";

-- AddForeignKey
ALTER TABLE "article_atom" ADD CONSTRAINT "article_atom_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image_url"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "content_group" ADD CONSTRAINT "content_group_image_id_fkey" FOREIGN KEY ("image_id") REFERENCES "image_url"("id") ON DELETE SET NULL ON UPDATE CASCADE;
