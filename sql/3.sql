CREATE TABLE ShopCart
(
Id INT PRIMARY KEY AUTO_INCREMENT,
UserId INT ,
RuleId INT ,
num INT DEFAULT 1 NOT NULL,
CreateTime TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
state INT DEFAULT 1 NOT NULL,
Delstate INT DEFAULT 1 NOT NULL
);user