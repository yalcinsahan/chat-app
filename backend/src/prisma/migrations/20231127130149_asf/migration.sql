/*
  Warnings:

  - You are about to drop the column `firstUser` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `secondUser` on the `Conversation` table. All the data in the column will be lost.
  - You are about to alter the column `createdAt` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `DateTime(6)` to `DateTime(3)`.
  - Added the required column `firstUserId` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondUserId` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Message` DROP FOREIGN KEY `Message_conversationId_fkey`;

-- AlterTable
ALTER TABLE `Conversation` DROP COLUMN `firstUser`,
    DROP COLUMN `secondUser`,
    ADD COLUMN `firstUserId` INTEGER NOT NULL,
    ADD COLUMN `secondUserId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Message` MODIFY `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3);

-- AlterTable
ALTER TABLE `User` MODIFY `username` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL;

-- RenameIndex
ALTER TABLE `User` RENAME INDEX `username` TO `User_username_key`;
