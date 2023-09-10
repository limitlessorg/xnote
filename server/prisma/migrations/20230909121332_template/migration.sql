/*
  Warnings:

  - You are about to drop the `x_publish` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "x_publish" DROP CONSTRAINT "x_publish_blockId_fkey";

-- DropForeignKey
ALTER TABLE "x_publish" DROP CONSTRAINT "x_publish_userId_fkey";

-- DropTable
DROP TABLE "x_publish";

-- CreateTable
CREATE TABLE "x_template" (
    "id" VARCHAR(32) NOT NULL,
    "blockId" VARCHAR(32) NOT NULL,
    "userId" VARCHAR(32) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "description" TEXT,

    CONSTRAINT "x_template_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "x_template" ADD CONSTRAINT "x_template_blockId_fkey" FOREIGN KEY ("blockId") REFERENCES "x_block"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "x_template" ADD CONSTRAINT "x_template_userId_fkey" FOREIGN KEY ("userId") REFERENCES "x_user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
