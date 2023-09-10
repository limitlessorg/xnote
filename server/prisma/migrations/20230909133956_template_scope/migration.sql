/*
  Warnings:

  - Added the required column `scope` to the `x_template` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "x_template" ADD COLUMN     "scope" VARCHAR(32) NOT NULL;
