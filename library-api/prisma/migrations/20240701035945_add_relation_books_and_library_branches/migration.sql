-- CreateTable
CREATE TABLE `library_branches_books` (
    `bookId` INTEGER NOT NULL,
    `libraryBranchId` INTEGER NOT NULL,

    PRIMARY KEY (`bookId`, `libraryBranchId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `library_branches_books` ADD CONSTRAINT `library_branches_books_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `library_branches_books` ADD CONSTRAINT `library_branches_books_libraryBranchId_fkey` FOREIGN KEY (`libraryBranchId`) REFERENCES `library_branches`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
