-- CreateTable
CREATE TABLE "access_token" (
    "token" TEXT NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'AccessToken',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "authorId" INTEGER NOT NULL,

    CONSTRAINT "access_token_pkey" PRIMARY KEY ("token")
);

-- AddForeignKey
ALTER TABLE "access_token" ADD CONSTRAINT "access_token_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
