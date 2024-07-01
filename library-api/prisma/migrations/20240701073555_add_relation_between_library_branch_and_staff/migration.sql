/*
  Warnings:

  - Added the required column `libraryBranchId` to the `staffs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `staffs` ADD COLUMN `libraryBranchId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `staffs` ADD CONSTRAINT `staffs_libraryBranchId_fkey` FOREIGN KEY (`libraryBranchId`) REFERENCES `library_branches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
