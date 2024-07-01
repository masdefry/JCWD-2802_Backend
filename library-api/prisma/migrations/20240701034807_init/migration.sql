-- CreateTable
CREATE TABLE `members` (
    `uid` VARCHAR(191) NOT NULL,
    `username` VARCHAR(25) NOT NULL,
    `address` LONGTEXT NOT NULL,
    `phoneNumber` VARCHAR(15) NOT NULL,
    `birthDate` DATE NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `library_branches` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(15) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `books` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `title` VARCHAR(100) NOT NULL,
    `author` VARCHAR(100) NOT NULL,
    `genre` VARCHAR(15) NOT NULL,
    `publishYear` DATE NOT NULL,
    `isbn` VARCHAR(100) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staffs` (
    `uid` VARCHAR(191) NOT NULL,
    `name` VARCHAR(50) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `phoneNumber` VARCHAR(15) NOT NULL,
    `position` VARCHAR(15) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`uid`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transactions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `borrowingDate` DATE NOT NULL,
    `returnDate` DATE NOT NULL,
    `totalPrice` INTEGER NOT NULL,
    `fine` INTEGER NULL,
    `memberUid` VARCHAR(191) NOT NULL,
    `staffUid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `transaction_details` (
    `qty` INTEGER NOT NULL,
    `transactionId` INTEGER NOT NULL,
    `bookId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`transactionId`, `bookId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `staff_schedules` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `clockIn` DATETIME(3) NOT NULL,
    `clockOut` DATETIME(3) NOT NULL,
    `staffUid` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_memberUid_fkey` FOREIGN KEY (`memberUid`) REFERENCES `members`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transactions` ADD CONSTRAINT `transactions_staffUid_fkey` FOREIGN KEY (`staffUid`) REFERENCES `staffs`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_details` ADD CONSTRAINT `transaction_details_transactionId_fkey` FOREIGN KEY (`transactionId`) REFERENCES `transactions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `transaction_details` ADD CONSTRAINT `transaction_details_bookId_fkey` FOREIGN KEY (`bookId`) REFERENCES `books`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `staff_schedules` ADD CONSTRAINT `staff_schedules_staffUid_fkey` FOREIGN KEY (`staffUid`) REFERENCES `staffs`(`uid`) ON DELETE RESTRICT ON UPDATE CASCADE;
