-- CreateTable
CREATE TABLE `users` (
    `id` VARCHAR(191) NOT NULL,
    `firstName` VARCHAR(25) NOT NULL,
    `lastName` VARCHAR(25) NOT NULL,
    `email` VARCHAR(50) NOT NULL,
    `password` VARCHAR(15) NOT NULL,
    `role` ENUM('HR', 'STAFF') NOT NULL,
    `shiftId` INTEGER NOT NULL,
    `positionId` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shifts` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(15) NOT NULL,
    `startTime` TIME NOT NULL,
    `endTime` TIME NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `attendances` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `date` DATE NOT NULL,
    `clockIn` TIME NOT NULL,
    `clockOut` TIME NOT NULL,
    `deduction` INTEGER NOT NULL,
    `userId` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `positions` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `salary` INTEGER NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `leaves` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `startDate` DATE NOT NULL,
    `endDate` DATE NOT NULL,
    `approvalStatus` ENUM('WAITING', 'ACCEPT', 'REJECT') NOT NULL,
    `userIdRequest` VARCHAR(191) NOT NULL,
    `userIdApproval` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,
    `deletedAt` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_shiftId_fkey` FOREIGN KEY (`shiftId`) REFERENCES `shifts`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_positionId_fkey` FOREIGN KEY (`positionId`) REFERENCES `positions`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `attendances` ADD CONSTRAINT `attendances_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leaves` ADD CONSTRAINT `leaves_userIdRequest_fkey` FOREIGN KEY (`userIdRequest`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `leaves` ADD CONSTRAINT `leaves_userIdApproval_fkey` FOREIGN KEY (`userIdApproval`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
