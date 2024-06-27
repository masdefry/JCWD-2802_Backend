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

>>> SLIDE-03
USE sakila;

SELECT first_name, last_name FROM actor;

SELECT actor_id, first_name, last_name FROM actor WHERE first_name = "Joe";

SELECT district, address, city_id FROM address WHERE district IN ("California", "Alberta", "Mekka");

SELECT COUNT(*) as last_name_wood FROM actor WHERE last_name = "Wood";

SELECT customer_id, SUM(amount) as total_amount FROM payment GROUP BY customer_id HAVING total_amount > 20;

>>> SLIDE-04

INSERT INTO actor(first_name, last_name) VALUES("JHONNY", "DAVIS");
SELECT * FROM actor WHERE first_name = "JHONNY";
DESCRIBE actor;

INSERT INTO actor(first_name, last_name) 
VALUES
("ADAM", "DAVIS"), 
("JEREMY", "DAVIS"), 
("CRAIG", "DAVIS"), 
("STEVE", "DAVIS");

SELECT COUNT(*) FROM actor WHERE last_name = "DAVIS";

DELETE FROM film_actor WHERE actor_id = 4;
DELETE FROM actor WHERE first_name = "JENNIFER" AND last_name = "DAVIS";

UPDATE actor SET first_name = "GEORGE" WHERE last_name = "DAVIS";

SELECT fa.actor_id, a.first_name, a.last_name, COUNT(fa.film_id) as total_film FROM film_actor fa 
JOIN actor a ON a.actor_id = fa.actor_id
GROUP BY actor_id ORDER BY total_film DESC LIMIT 10;

SELECT title, description, length, rating FROM film 
WHERE special_features LIKE "%DELETED SCENE%" AND special_features LIKE "%BEHIND THE SCENE%"
ORDER BY length DESC;

SELECT c.country, count(cust.customer_id) as inactive_customer FROM customer cust
JOIN address a ON cust.address_id = a.address_id
JOIN city cit ON a.city_id = cit.city_id
JOIN country c ON cit.country_id = c.country_id
WHERE cust.active = 0
GROUP BY c.country ORDER BY inactive_customer DESC;