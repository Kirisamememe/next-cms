-- AlterTable
ALTER TABLE "collection" ADD COLUMN     "api_id" INTEGER;

-- AlterTable
ALTER TABLE "content" ADD COLUMN     "api_id" INTEGER;

-- CreateTable
CREATE TABLE "api" (
                       "id" SERIAL NOT NULL,
                       "name" TEXT NOT NULL,
                       "path" TEXT NOT NULL,
                       "key" TEXT,
                       "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
                       "updated_at" TIMESTAMP(3) NOT NULL,
                       "last_accessed_at" TIMESTAMP(3),
                       "activated_at" TIMESTAMP(3),
                       "allowed_origins" TEXT NOT NULL,

                       CONSTRAINT "api_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "api_name_key" ON "api"("name");

-- CreateIndex
CREATE UNIQUE INDEX "api_path_key" ON "api"("path");

-- CreateIndex
CREATE UNIQUE INDEX "api_key_key" ON "api"("key");

-- AddForeignKey
ALTER TABLE "content" ADD CONSTRAINT "content_api_id_fkey" FOREIGN KEY ("api_id") REFERENCES "api"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "collection" ADD CONSTRAINT "collection_api_id_fkey" FOREIGN KEY ("api_id") REFERENCES "api"("id") ON DELETE SET NULL ON UPDATE CASCADE;
