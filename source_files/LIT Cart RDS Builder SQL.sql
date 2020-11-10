DROP DATABASE lit_cart_demo;
CREATE DATABASE lit_cart_demo;
USE lit_cart_demo;

#create tables
CREATE TABLE stores
	(storeID CHAR(3) NOT NULL PRIMARY KEY,
    storeName VARCHAR(50) NOT NULL,
    Address VARCHAR(200) NOT NULL,
    closeStore1 CHAR(3) NOT NULL,
    closeStore2 CHAR(3) NOT NULL);
    
CREATE TABLE inventory_001
	(prodID CHAR(3) NOT NULL PRIMARY KEY,
    prodName VARCHAR(200) NOT NULL,
    Price VARCHAR(6) NOT NULL,
    Quantity VARCHAR(4) NOT NULL,
    restockDate CHAR(10) NOT NULL);
    
CREATE TABLE inventory_002
	(prodID CHAR(3) NOT NULL PRIMARY KEY,
    prodName VARCHAR(200) NOT NULL,
    Price VARCHAR(6) NOT NULL,
    Quantity VARCHAR(4) NOT NULL,
    restockDate CHAR(10) NOT NULL);
    
CREATE TABLE inventory_003
	(prodID CHAR(3) NOT NULL PRIMARY KEY,
    prodName VARCHAR(200) NOT NULL,
    Price VARCHAR(6) NOT NULL,
    Quantity VARCHAR(4) NOT NULL,
    restockDate CHAR(10) NOT NULL);
    
#populate tables
INSERT INTO stores
	(storeID, storeName, Address, closeStore1, closeStore2)
VALUES
	('001','Fairprice Finest, Junction 8','9 Bishan Pl, #B1-01 Bishan Bus Interchange, S579837','002','003'),
    ('002','Giant Supermarket Bishan','Blk 512 #01, Bishan Street 13, 524, S570512','001','003'),
    ('003','Tian Ma Group Bishan','Blk, 513 Bishan Street 13, S570513','001','002');
    
INSERT INTO inventory_001
	(prodID, prodName, Price, Quantity, restockDate)
VALUES
	('001','Scott Extra Toilet Tissue Rolls - Regular (2 Ply)','5.85','20','21/06/2020'),
    ('002','Kleenex Ultra Soft Toilet Tissue Rolls - Cottony Clean [10x]','7.25','42','21/06/2020'),
    ('003','PurSoft Toilet Tissue Roll - Unscented [10x]','6.45','9','21/06/2020'),
    ('004','PurSoft Bathroom Tissue Roll - Unscented (4ply) [20x]','5.85','91','13/06/2020'),
    ('005','Farmhouse UHT Milk - Fresh [1L]','2.10','91','21/06/2020'),
    ('006','Meiji Fresh Milk- Regular [2L]','5.90','64','21/06/2020'),
    ('007','NTUC UHT Milk -Full Cream [1L]','1.70','148','05/06/2020'),
    ('008','F&N Magnolia Low Fat Hi-Cal Milk - Fresh [1L]','3.50','43','21/06/2020'),
    ('009','Fairprice Jasmine Fragrant Rice [5kg]','8.2','7','05/06/2020'),
    ('010','Fairprice Thailand Rice - Fragrant White [5kg]','6.85','11','05/06/2020'),
    ('011','Fairprice Thailand Rice - Brown Unpolished [5kg]','11.2','29','05/06/2020'),
    ('012','Golden Phoenix Rice - Thai Hom Mali','13.8','2','05/06/2020');
    
INSERT INTO inventory_002
	(prodID, prodName, Price, Quantity, restockDate)
VALUES
	('001','Scott Extra Toilet Tissue Rolls - Regular (2 Ply) [20x]','5.85','12','11/06/2020'),
    ('002','Meadows Thai Fragrant Rice [5kg]','9.80','201','11/06/2020'),
    ('003','Golden Royal Jewel - Hommaili Rice [10kg]','24.95','121','11/06/2020'),
    ('004','Golden Phoenix Rice - Thai Hom Mali','13.8','45','11/06/2020'),
	('005', 'Farmhouse UHT Milk - Fresh [1L]', '2.10', '23', '11/06/2020');
    
INSERT INTO inventory_003
	(prodID, prodName, Price, Quantity, restockDate)
VALUES
	('001','Scott Extra Toilet Tissue Rolls - Regular (2 Ply) [20x]','5.85','43','07/06/2020'),
    ('002','F&N Magnolia Low Fat Hi-Cal Milk - Fresh [1L]','3.50','53','07/06/2020'),
    ('003','Golden Royal Jewel - Hommaili Rice [10kg]','24.95','57','15/06/2020'),
    ('004','Golden Phoenix Rice - Thai Hom Mali','13.8','23','07/06/2020');
