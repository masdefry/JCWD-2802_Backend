CREATE TABLE `members` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(15),
  `address` varchar(255),
  `phone_number` varchar(15),
  `birthdate` date,
  `created_at` timestamp
);

CREATE TABLE `books` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `title` varchar(100),
  `author` varchar(100),
  `genre` varchar(25),
  `publish_year` date,
  `isbn` varchar(100),
  `created_at` timestamp
);

CREATE TABLE `transactions` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `borrowing_date` date,
  `return_date` date,
  `total_price` integer,
  `fine` integer,
  `members_id` integer,
  `staff_id` integer,
  `created_at` timestamp
);

CREATE TABLE `transaction_details` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `quantity` integer,
  `books_id` integer,
  `transactions_id` integer,
  `created_at` timestamp
);

CREATE TABLE `staff` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `email` varchar(50),
  `password` varchar(50),
  `phone_number` varchar(15),
  `position` varchar(15),
  `created_at` timestamp,
  `library_branch_id` integer
);

CREATE TABLE `staff_schedule` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `staff_id` integer,
  `clock_in` time,
  `clock_out` time,
  `created_at` timestamp
);

CREATE TABLE `library_branch` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `location` varchar(50),
  `phone_number` varchar(15),
  `email` varchar(50),
  `created_at` timestamp
);

CREATE TABLE `library_branch_books` (
  `books_id` integer,
  `library_branch_id` integer
);

ALTER TABLE `transactions` ADD FOREIGN KEY (`members_id`) REFERENCES `members` (`id`);

ALTER TABLE `transactions` ADD FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`);

ALTER TABLE `transaction_details` ADD FOREIGN KEY (`books_id`) REFERENCES `books` (`id`);

ALTER TABLE `transaction_details` ADD FOREIGN KEY (`transactions_id`) REFERENCES `transactions` (`id`);

ALTER TABLE `staff` ADD FOREIGN KEY (`library_branch_id`) REFERENCES `library_branch` (`id`);

ALTER TABLE `staff_schedule` ADD FOREIGN KEY (`staff_id`) REFERENCES `staff` (`id`);

ALTER TABLE `library_branch_books` ADD FOREIGN KEY (`books_id`) REFERENCES `books` (`id`);

ALTER TABLE `library_branch_books` ADD FOREIGN KEY (`library_branch_id`) REFERENCES `library_branch` (`id`);
