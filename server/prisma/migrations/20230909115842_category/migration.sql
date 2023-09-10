/*
  Warnings:

  - Added the required column `title` to the `x_share` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "x_share" ADD COLUMN     "title" VARCHAR(255) NOT NULL;

-- CreateTable
CREATE TABLE "x_category" (
    "id" VARCHAR(32) NOT NULL,
    "code" VARCHAR(64) NOT NULL,
    "name" VARCHAR(255) NOT NULL,

    CONSTRAINT "x_category_pkey" PRIMARY KEY ("id")
);
