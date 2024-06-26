SELECT * FROM jcwd2802_relation.users;

use jcwd2802_relation;

INSERT INTO users(username, email) VALUES("ryan01", "ryan01@gmail.com"); 
INSERT INTO users(username, email) VALUES("bagoes01", "bagoes01@gmail.com"); 

INSERT INTO address(street, postal_code, users_id) VALUES("Jl. Green", "19350", 2);

-- INNER JOIN
SELECT * FROM users u 
JOIN address a ON u.id = a.users_id; 

-- LEFT JOIN
SELECT * FROM users u 
LEFT JOIN address a ON u.id = a.users_id; 

-- RIGHT JOIN
SELECT * FROM users u 
RIGHT JOIN address a ON u.id = a.users_id; 

-- OUTER JOIN
SELECT * FROM users u 
CROSS JOIN address; 

START TRANSACTION;
INSERT INTO users(username, email) VALUES("users6", "users06@gmail.com");
INSERT INTO addresss(street, postal_code, users_id) VALUES("Jl. Bebas", "66666", 3);
COMMIT;