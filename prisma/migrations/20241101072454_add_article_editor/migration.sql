-- AlterTable
ALTER TABLE "article" ADD COLUMN     "last_edited_by" INTEGER;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_last_edited_by_fkey" FOREIGN KEY ("last_edited_by") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
