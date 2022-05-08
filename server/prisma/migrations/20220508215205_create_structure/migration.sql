-- CreateTable
CREATE TABLE `events_users` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `unity` ENUM('BH', 'Contagem', 'NovaLima', 'Gutierrez') NOT NULL,
    `profile` ENUM('Admin', 'Operador') NOT NULL DEFAULT 'Operador',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `events_guests` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `financial` VARCHAR(191) NOT NULL,
    `financialEmail` VARCHAR(191) NOT NULL,
    `academic` VARCHAR(191) NOT NULL,
    `academicEmail` VARCHAR(191) NOT NULL,
    `father` VARCHAR(191) NOT NULL,
    `fatherEmail` VARCHAR(191) NOT NULL,
    `mother` VARCHAR(191) NOT NULL,
    `motherEmail` VARCHAR(191) NOT NULL,
    `student` VARCHAR(191) NOT NULL,
    `studentEmail` VARCHAR(191) NOT NULL,
    `course` VARCHAR(191) NOT NULL,
    `ra` VARCHAR(191) NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `events_guests_ra_key`(`ra`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
