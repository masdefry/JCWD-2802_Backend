>>> SLIDE-01
CREATE DATABASE purwadhika_student;
CREATE DATABASE purwadhika_schedule;
CREATE DATABASE purwadhika_branch;

SHOW DATABASES LIKE "%purwadhika%";

DROP DATABASE purwadhika_schedule;

USE purwadhika_student;

CREATE TABLE Students(
id integer not null primary key auto_increment,
fullname varchar(50) not null, 
address varchar(255) not null, 
city varchar(255) not null
);

SHOW TABLES;

ALTER TABLE Students ADD COLUMN email varchar(255) not null;
SELECT * FROM Students;

ALTER TABLE Students ADD COLUMN(
gender varchar(10) not null, 
batch_code varchar(10) not null, 
phone_number varchar(10) not null, 
alternative_phone_number varchar(10) not null
);

ALTER TABLE Students RENAME COLUMN alternative_phone_number TO description;

ALTER TABLE Students DROP COLUMN gender;

