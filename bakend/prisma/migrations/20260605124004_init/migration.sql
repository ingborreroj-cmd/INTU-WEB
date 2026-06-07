/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Admin` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Admin" ADD COLUMN "lastName" TEXT;
ALTER TABLE "Admin" ADD COLUMN "phone" TEXT;
ALTER TABLE "Admin" ADD COLUMN "position" TEXT;
ALTER TABLE "Admin" ADD COLUMN "username" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");
