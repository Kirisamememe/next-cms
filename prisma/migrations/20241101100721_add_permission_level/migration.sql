-- AlterTable
ALTER TABLE "article"
ADD COLUMN "permission_level" INTEGER NOT NULL DEFAULT 3,
ADD CONSTRAINT "article_permission_level_check" CHECK (
    permission_level >= 1
    AND permission_level <= 3
);

-- AlterTable
ALTER TABLE "content"
ADD COLUMN "permission_level" INTEGER NOT NULL DEFAULT 3,
ADD CONSTRAINT "content_permission_level_check" CHECK (
    permission_level >= 1
    AND permission_level <= 3
);