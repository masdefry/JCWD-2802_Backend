CREATE TABLE `Buyer` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(50),
  `email` varchar(50),
  `phone_number` varchar(15),
  `isVerified` bool,
  `created_at` timestamp
);

CREATE TABLE `BuyerAddress` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `receiver` varchar(50),
  `address` text,
  `postal_code` integer,
  `city` varchar(50),
  `province` varchar(50),
  `phone_number` varchar(15),
  `buyer_id` integer,
  `created_at` timestamp
);

CREATE TABLE `Seller` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `address` text,
  `postal_code` integer,
  `city` varchar(50),
  `province` varchar(50),
  `phone_number` varchar(15),
  `created_at` timestamp
);

CREATE TABLE `Products` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `stock` integer,
  `price` integer,
  `description` text,
  `category_id` integer,
  `seller_id` integer,
  `created_at` timestamp
);

CREATE TABLE `Category` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(25),
  `created_at` timestamp
);

CREATE TABLE `Cart` (
  `buyer_id` integer,
  `product_id` integer,
  `quantity` integer,
  `created_at` timestamp
);

CREATE TABLE `Transaction` (
  `id` varchar(255) PRIMARY KEY AUTO_INCREMENT,
  `address` varchar(255),
  `total_transaction` integer,
  `payment_method` varchar(15),
  `shipment_method` varchar(15),
  `buyer_id` integer,
  `created_at` timestamp
);

CREATE TABLE `TransactionDetail` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `product_name` varchar(50),
  `product_price` varchar(50),
  `quantity` integer,
  `product_discount` integer,
  `transaction_id` integer,
  `created_at` timestamp
);

CREATE TABLE `Status` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `created_at` timestamp
);

CREATE TABLE `TransactionStatus` (
  `transaction_id` integer,
  `status_id` integer,
  `created_at` timestamp
);

CREATE TABLE `Review` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `rating` integer,
  `comment` text,
  `product_id` integer,
  `buyer_id` integer,
  `created_at` timestamp
);

ALTER TABLE `BuyerAddress` ADD FOREIGN KEY (`buyer_id`) REFERENCES `Buyer` (`id`);

ALTER TABLE `Products` ADD FOREIGN KEY (`category_id`) REFERENCES `Category` (`id`);

ALTER TABLE `Products` ADD FOREIGN KEY (`seller_id`) REFERENCES `Seller` (`id`);

ALTER TABLE `Cart` ADD FOREIGN KEY (`buyer_id`) REFERENCES `Buyer` (`id`);

ALTER TABLE `Cart` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

ALTER TABLE `Transaction` ADD FOREIGN KEY (`buyer_id`) REFERENCES `Buyer` (`id`);

ALTER TABLE `TransactionDetail` ADD FOREIGN KEY (`transaction_id`) REFERENCES `Transaction` (`id`);

ALTER TABLE `TransactionStatus` ADD FOREIGN KEY (`transaction_id`) REFERENCES `Transaction` (`id`);

ALTER TABLE `TransactionStatus` ADD FOREIGN KEY (`status_id`) REFERENCES `Status` (`id`);

ALTER TABLE `Review` ADD FOREIGN KEY (`product_id`) REFERENCES `Products` (`id`);

ALTER TABLE `Review` ADD FOREIGN KEY (`buyer_id`) REFERENCES `Buyer` (`id`);
