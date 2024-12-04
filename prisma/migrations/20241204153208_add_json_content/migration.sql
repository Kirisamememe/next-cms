
-- DropForeignKey
ALTER TABLE "article" DROP CONSTRAINT "article_category_id_fkey";

-- DropForeignKey
ALTER TABLE "boolean_value" DROP CONSTRAINT "boolean_value_field_id_fkey";

-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_api_id_fkey";

-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_author_id_fkey";

-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_category_id_fkey";

-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "content" DROP CONSTRAINT "content_homepage_id_fkey";

-- DropForeignKey
ALTER TABLE "content_tag_junction" DROP CONSTRAINT "content_tag_junction_content_id_fkey";

-- DropForeignKey
ALTER TABLE "content_tag_junction" DROP CONSTRAINT "content_tag_junction_tag_id_fkey";

-- DropForeignKey
ALTER TABLE "date_value" DROP CONSTRAINT "date_value_field_id_fkey";

-- DropForeignKey
ALTER TABLE "datetime_value" DROP CONSTRAINT "datetime_value_field_id_fkey";

-- DropForeignKey
ALTER TABLE "field" DROP CONSTRAINT "field_content_id_fkey";

-- DropForeignKey
ALTER TABLE "field" DROP CONSTRAINT "field_field_type_id_fkey";

-- DropForeignKey
ALTER TABLE "field_type" DROP CONSTRAINT "field_type_collection_id_fkey";

-- DropForeignKey
ALTER TABLE "number_value" DROP CONSTRAINT "number_value_field_id_fkey";

-- DropForeignKey
ALTER TABLE "text_value" DROP CONSTRAINT "text_value_field_id_fkey";

-- DropForeignKey
ALTER TABLE "url_value" DROP CONSTRAINT "url_value_field_id_fkey";

-- DropTable
DROP TABLE "boolean_value";

-- DropTable
DROP TABLE "category";

-- DropTable
DROP TABLE "content";

-- DropTable
DROP TABLE "content_tag_junction";

-- DropTable
DROP TABLE "date_value";

-- DropTable
DROP TABLE "datetime_value";

-- DropTable
DROP TABLE "field";

-- DropTable
DROP TABLE "field_type";

-- DropTable
DROP TABLE "homepage";

-- DropTable
DROP TABLE "number_value";

-- DropTable
DROP TABLE "text_value";

-- DropTable
DROP TABLE "url_value";

-- CreateTable
CREATE TABLE "json_content" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "published_at" TIMESTAMP(3),
    "archived_at" TIMESTAMP(3),
    "author_id" INTEGER NOT NULL,
    "last_editor_id" INTEGER NOT NULL,
    "category_id" INTEGER,

    CONSTRAINT "json_content_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "json_atom" (
    "id" SERIAL NOT NULL,
    "content" JSONB NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1000,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "selected_at" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "author_id" INTEGER NOT NULL,
    "json_content_id" INTEGER NOT NULL,

    CONSTRAINT "json_atom_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "article_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "article_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "json_content_category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "json_content_category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "json_content_tag_junction" (
    "json_content_id" INTEGER NOT NULL,
    "tag_id" INTEGER NOT NULL,

    CONSTRAINT "json_content_tag_junction_pkey" PRIMARY KEY ("json_content_id","tag_id")
);

-- AddForeignKey
ALTER TABLE "json_content" ADD CONSTRAINT "json_content_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "json_content" ADD CONSTRAINT "json_content_last_editor_id_fkey" FOREIGN KEY ("last_editor_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "json_content" ADD CONSTRAINT "json_content_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "json_content_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "json_atom" ADD CONSTRAINT "json_atom_author_id_fkey" FOREIGN KEY ("author_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "json_atom" ADD CONSTRAINT "json_atom_json_content_id_fkey" FOREIGN KEY ("json_content_id") REFERENCES "json_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "article" ADD CONSTRAINT "article_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "article_category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "json_content_tag_junction" ADD CONSTRAINT "json_content_tag_junction_json_content_id_fkey" FOREIGN KEY ("json_content_id") REFERENCES "json_content"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "json_content_tag_junction" ADD CONSTRAINT "json_content_tag_junction_tag_id_fkey" FOREIGN KEY ("tag_id") REFERENCES "tag"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
