SELECT * FROM titanic.passangers;

USE titanic;

-- ORDER BY
-- Mengurutkan Data Penumpang Berdasarkan Umur yang Paling Tua
SELECT * FROM passangers ORDER BY age; -- ASCENDING
SELECT * FROM passangers ORDER BY age DESC; 

-- GROUP BY
-- Total Penumpang yang Selamat & Meninggal
SELECT COUNT(*) as total_passangers, survived FROM passangers GROUP BY survived;

SELECT * FROM passangers WHERE survived = 1;

-- LIMIT
SELECT * FROM passangers LIMIT 10;

-- OFFSET
SELECT * FROM passangers;
SELECT COUNT(*) FROM passangers;
SELECT * FROM passangers LIMIT 714 OFFSET 2; 

-- SUBQUERY > Query didalam Query
-- Penumpang Pria yang Umurnya diatas Rata2 Seluruh Penumpang
SELECT AVG(age) FROM passangers;

SELECT * FROM passangers WHERE sex='male' AND age > 
(SELECT AVG(age) FROM passangers);



-- EXERCISE
-- 1. Ambil 1 Data Penumpang yang Memiliki Umur Paling Tua
SELECT * FROM passangers ORDER BY age DESC LIMIT 1;

-- 2. Hitung Total Penumpang yang Meninggal di Masing2 Class
SELECT COUNT(*) as total_passangers, Pclass FROM passangers WHERE survived = 0 GROUP BY Pclass;

-- 3. Hitung Rata2 Tiket Masing2 Class 
SELECT AVG(Fare) as AVG_Ticket, Pclass FROM passangers GROUP BY Pclass;

-- 4. Ambil Data Penumpang yang Harga Tiketnya diatas Rata2 Harga Tiket Seluruh Penumpang
SELECT * FROM passangers WHERE Fare > 
(SELECT AVG(Fare) FROM passangers);

-- 5. Ambil Data Penumpang ke-5 yg Membayar Fare Paling Mahal 
SELECT * FROM passangers ORDER BY Fare DESC LIMIT 1 OFFSET 4;



// Buatlah REST API Express dengan 4 Item End-Point, Dimana Setiap
// End-Point Meng-Eksekusi Request Handler Sebagai Berikut: 

// 1. User Dapat Mencari Data Penumpang Berdasarkan Nama
Request : /passangers?PassangerName=Helen

// 2. User Dapat Melihat Data Penumpang yang Selamat Beserta dengan Jumlahnya Berdasarkan Gender yang User Tentukan 
Request : /passangers?Survived=1&Sex=Male
          /passangers?Survived=1&Sex=Female

// 3. User Dapat Melihat List Penumpang yang Tidak Selamat dan Berada di Class yang Ditentukan oleh User
Request : /passangers?Survived=0&Pclass=1
          /passangers?Survived=0&Pclass=2
          /passangers?Survived=0&Pclass=3