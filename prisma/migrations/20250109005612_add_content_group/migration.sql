-- CreateTable
CREATE TABLE "content_group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "content_group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_ContentGroupToArticle" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContentGroupToArticle_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ContentGroupToJsonContent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContentGroupToJsonContent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ContentGroupToImageUrl" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ContentGroupToImageUrl_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_ContentGroupToMediaFolder" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_ContentGroupToMediaFolder_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "content_group_name_key" ON "content_group"("name");

-- CreateIndex
CREATE INDEX "_ContentGroupToArticle_B_index" ON "_ContentGroupToArticle"("B");

-- CreateIndex
CREATE INDEX "_ContentGroupToJsonContent_B_index" ON "_ContentGroupToJsonContent"("B");

-- CreateIndex
CREATE INDEX "_ContentGroupToImageUrl_B_index" ON "_ContentGroupToImageUrl"("B");

-- CreateIndex
CREATE INDEX "_ContentGroupToMediaFolder_B_index" ON "_ContentGroupToMediaFolder"("B");

-- AddForeignKey
ALTER TABLE "_ContentGroupToArticle" ADD CONSTRAINT "_ContentGroupToArticle_A_fkey" FOREIGN KEY ("A") REFERENCES "content_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentGroupToArticle" ADD CONSTRAINT "_ContentGroupToArticle_B_fkey" FOREIGN KEY ("B") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentGroupToJsonContent" ADD CONSTRAINT "_ContentGroupToJsonContent_A_fkey" FOREIGN KEY ("A") REFERENCES "content_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentGroupToJsonContent" ADD CONSTRAINT "_ContentGroupToJsonContent_B_fkey" FOREIGN KEY ("B") REFERENCES "json_content"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentGroupToImageUrl" ADD CONSTRAINT "_ContentGroupToImageUrl_A_fkey" FOREIGN KEY ("A") REFERENCES "content_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentGroupToImageUrl" ADD CONSTRAINT "_ContentGroupToImageUrl_B_fkey" FOREIGN KEY ("B") REFERENCES "image_url"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentGroupToMediaFolder" ADD CONSTRAINT "_ContentGroupToMediaFolder_A_fkey" FOREIGN KEY ("A") REFERENCES "content_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ContentGroupToMediaFolder" ADD CONSTRAINT "_ContentGroupToMediaFolder_B_fkey" FOREIGN KEY ("B") REFERENCES "media_folder"("path") ON DELETE CASCADE ON UPDATE CASCADE;
