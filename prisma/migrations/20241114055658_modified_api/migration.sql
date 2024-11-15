/*
  Warnings:

  - Added the required column `authorId` to the `api` table without a default value. This is not possible if the table is not empty.
  - Added the required column `lastEditorId` to the `api` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "api" ADD COLUMN     "authorId" INTEGER NOT NULL,
ADD COLUMN     "lastEditorId" INTEGER NOT NULL,
ALTER COLUMN "allowed_origins" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "api" ADD CONSTRAINT "api_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "api" ADD CONSTRAINT "api_lastEditorId_fkey" FOREIGN KEY ("lastEditorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
