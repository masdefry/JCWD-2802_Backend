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

>>> SLIDE-02

USE purwadhika_branch;

CREATE TABLE branches(
id integer not null primary key auto_increment,
branch_name varchar(50) not null, 
pic varchar(15) not null, 
address varchar(255) not null, 
city varchar(50) not null, 
province varchar(50) not null
);

SHOW TABLES;
DESCRIBE branches;

INSERT INTO branches(branch_name, pic, address, city, province) VALUES (
("BSD", "Angel", "GOP", "BSD", "Tangerang"),
("JKT", "Budi", "MSIG Tower", "Jakarta Selatan", "Jakarta")
);

INSERT INTO branches(branch_name, pic, address, city, province) VALUES ("BSD", "Angel", "GOP", "BSD", "Tangerang");
SELECT * FROM branches;

UPDATE branches SET pic = "Dono" WHERE id=1;

INSERT INTO branches(branch_name, pic, address, city, province) VALUES ("BLI", "Tono", "Gianyar", "Gianyar", "Bali");