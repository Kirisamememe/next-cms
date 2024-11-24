-- CreateTable
CREATE TABLE "media_folder" (
    "path" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),
    "parent_path" TEXT,

    CONSTRAINT "media_folder_pkey" PRIMARY KEY ("path")
);

-- CreateTable
CREATE TABLE "image_url" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "archived_at" TIMESTAMP(3),
    "folder_path" TEXT,
    "author_id" INTEGER NOT NULL,
    "last_edited_by" INTEGER NOT NULL,

    CONSTRAINT "image_url_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "media_folder_name_path_key" ON "media_folder"("name", "path");

-- CreateIndex
CREATE UNIQUE INDEX "image_url_name_key" ON "image_url"("name");

-- AddForeignKey
ALTER TABLE "media_folder" ADD CONSTRAINT "media_folder_parent_path_fkey" FOREIGN KEY ("parent_path") REFERENCES "media_folder"("path") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_url" ADD CONSTRAINT "image_url_folder_path_fkey" FOREIGN KEY ("folder_path") REFERENCES "media_folder"("path") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_url" ADD CONSTRAINT "image_url_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "image_url" ADD CONSTRAINT "image_url_last_edited_by_fkey" FOREIGN KEY ("last_edited_by") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
