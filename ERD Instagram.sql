CREATE TABLE `Users` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `username` varchar(50),
  `password` varchar(50),
  `profilePict` varchar(255),
  `gender` varchar(10),
  `bio` varchar(255),
  `isPrivacy` bool(false),
  `created_at` timestamp
);

CREATE TABLE `Posts` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `users_id` integer,
  `caption` text,
  `created_at` timestamp
);

CREATE TABLE `PostImages` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `imagePost` varchar(255),
  `posts_id` integer,
  `created_at` timestamp
);

CREATE TABLE `PostLikes` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `posts_id` integer,
  `users_id` integer,
  `created_at` timestamp
);

CREATE TABLE `PostComments` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `comment` text,
  `posts_id` integer,
  `users_id` integer,
  `created_at` timestamp
);

CREATE TABLE `Followers` (
  `following` integer,
  `followee` integer,
  `created_at` timestamp
);

CREATE TABLE `Messages` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `message` text,
  `sender` integer,
  `receiver` integer,
  `created_at` timestamp
);

CREATE TABLE `Story` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `imageOrVideo` varchar(255),
  `expiryDate` timestamp,
  `users_id` integer
);

ALTER TABLE `Posts` ADD FOREIGN KEY (`users_id`) REFERENCES `Users` (`id`);

ALTER TABLE `PostImages` ADD FOREIGN KEY (`posts_id`) REFERENCES `Posts` (`id`);

ALTER TABLE `PostLikes` ADD FOREIGN KEY (`posts_id`) REFERENCES `Posts` (`id`);

ALTER TABLE `PostLikes` ADD FOREIGN KEY (`users_id`) REFERENCES `Users` (`id`);

ALTER TABLE `PostComments` ADD FOREIGN KEY (`posts_id`) REFERENCES `Posts` (`id`);

ALTER TABLE `PostComments` ADD FOREIGN KEY (`users_id`) REFERENCES `Users` (`id`);

ALTER TABLE `Followers` ADD FOREIGN KEY (`following`) REFERENCES `Users` (`id`);

ALTER TABLE `Followers` ADD FOREIGN KEY (`followee`) REFERENCES `Users` (`id`);

ALTER TABLE `Messages` ADD FOREIGN KEY (`sender`) REFERENCES `Users` (`id`);

ALTER TABLE `Messages` ADD FOREIGN KEY (`receiver`) REFERENCES `Users` (`id`);

ALTER TABLE `Story` ADD FOREIGN KEY (`users_id`) REFERENCES `Users` (`id`);
