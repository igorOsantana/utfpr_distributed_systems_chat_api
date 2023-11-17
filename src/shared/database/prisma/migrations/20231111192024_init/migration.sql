/*
  Warnings:

  - You are about to drop the column `readAt` on the `chats` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "chats" DROP COLUMN "readAt",
ADD COLUMN     "read" BOOLEAN NOT NULL DEFAULT false;
