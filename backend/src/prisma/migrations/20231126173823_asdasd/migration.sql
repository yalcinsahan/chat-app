/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Conversation` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Message` table. All the data in the column will be lost.
  - Added the required column `firstUser` to the `Conversation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `secondUser` to the `Conversation` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `name` ON `Conversation`;

-- AlterTable
ALTER TABLE `Conversation` DROP COLUMN `createdAt`,
    DROP COLUMN `name`,
    DROP COLUMN `updatedAt`,
    ADD COLUMN `firstUser` INTEGER NOT NULL,
    ADD COLUMN `secondUser` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `Message` DROP COLUMN `updatedAt`;
