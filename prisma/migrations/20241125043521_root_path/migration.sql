-- DropForeignKey
ALTER TABLE "image_url" DROP CONSTRAINT "image_url_folder_path_fkey";

-- AlterTable
ALTER TABLE "image_url" ALTER COLUMN "folder_path" SET DEFAULT '.';

-- AddForeignKey
ALTER TABLE "image_url" ADD CONSTRAINT "image_url_folder_path_fkey" FOREIGN KEY ("folder_path") REFERENCES "media_folder"("path") ON DELETE RESTRICT ON UPDATE CASCADE;
