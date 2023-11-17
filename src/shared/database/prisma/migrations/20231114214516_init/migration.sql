/*
  Warnings:

  - You are about to drop the column `read` on the `chats` table. All the data in the column will be lost.
  - You are about to drop the `_chats` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_chats" DROP CONSTRAINT "_chats_A_fkey";

-- DropForeignKey
ALTER TABLE "_chats" DROP CONSTRAINT "_chats_B_fkey";

-- AlterTable
ALTER TABLE "chats" DROP COLUMN "read";

-- DropTable
DROP TABLE "_chats";

-- CreateTable
CREATE TABLE "UsersOnChats" (
    "chatId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "UsersOnChats_pkey" PRIMARY KEY ("chatId","userId")
);

-- AddForeignKey
ALTER TABLE "UsersOnChats" ADD CONSTRAINT "UsersOnChats_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "chats"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UsersOnChats" ADD CONSTRAINT "UsersOnChats_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
