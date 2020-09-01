INSERT INTO ShopCart(UserId,RuleId) VALUES(?,?)

SELECT p.feng,p.title,r.price,s.sum,r.Id AS rid FROM shopcart s JOIN productrule r
	ON s.RuleId = r.Id JOIN product p
	ON r.ProductId = p.Id