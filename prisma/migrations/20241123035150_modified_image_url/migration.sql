/*
  Warnings:

  - A unique constraint covering the columns `[name,folder_path]` on the table `image_url` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "image_url_name_key";

-- CreateIndex
CREATE UNIQUE INDEX "image_url_name_folder_path_key" ON "image_url"("name", "folder_path");
