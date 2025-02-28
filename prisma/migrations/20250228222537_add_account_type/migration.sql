/*
  Warnings:

  - Added the required column `type` to the `Account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Account" ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" INTEGER,
ADD COLUMN     "refresh_token" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;
