/*
  Warnings:

  - The primary key for the `FriendshipInvitations` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `FriendshipInvitations` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "FriendshipInvitations" DROP CONSTRAINT "FriendshipInvitations_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "FriendshipInvitations_pkey" PRIMARY KEY ("senderId", "recipientId");
