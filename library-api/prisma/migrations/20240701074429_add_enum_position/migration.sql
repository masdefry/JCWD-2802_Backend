/*
  Warnings:

  - You are about to alter the column `position` on the `staffs` table. The data in that column could be lost. The data in that column will be cast from `VarChar(15)` to `Enum(EnumId(0))`.

*/
-- AlterTable
ALTER TABLE `staffs` MODIFY `position` ENUM('HEAD_OFFICE', 'HELPER') NOT NULL;
