/*
  Warnings:

  - You are about to drop the `_ContentGroupToArticle` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_ContentGroupToArticle" DROP CONSTRAINT "_ContentGroupToArticle_A_fkey";

-- DropForeignKey
ALTER TABLE "_ContentGroupToArticle" DROP CONSTRAINT "_ContentGroupToArticle_B_fkey";

-- DropTable
DROP TABLE "_ContentGroupToArticle";

-- CreateTable
CREATE TABLE "_ArticleToContentGroup" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_ArticleToContentGroup_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_ArticleToContentGroup_B_index" ON "_ArticleToContentGroup"("B");

-- AddForeignKey
ALTER TABLE "_ArticleToContentGroup" ADD CONSTRAINT "_ArticleToContentGroup_A_fkey" FOREIGN KEY ("A") REFERENCES "article"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ArticleToContentGroup" ADD CONSTRAINT "_ArticleToContentGroup_B_fkey" FOREIGN KEY ("B") REFERENCES "content_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
