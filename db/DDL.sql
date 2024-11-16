DROP SCHEMA IF EXISTS delivery CASCADE;
DROP TABLE IF EXISTS person CASCADE;
DROP TABLE IF EXISTS customers CASCADE;
DROP TABLE IF EXISTS delivery_mans CASCADE;
DROP TABLE IF EXISTS items CASCADE;
DROP TABLE IF EXISTS menus CASCADE;
DROP TABLE IF EXISTS orders CASCADE;
DROP TABLE IF EXISTS restaurants CASCADE;
DROP TABLE IF EXISTS order_items CASCADE;

CREATE SCHEMA delivery;

CREATE TABLE delivery.person (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	location POINT NOT NULL
);

CREATE TABLE delivery.menus (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL
);

CREATE TABLE delivery.items (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	description TEXT NOT NULL,
	price INTEGER NOT NULL
);

CREATE TABLE delivery.menu_items (
	menu_id INTEGER REFERENCES delivery.menus(id) ON DELETE CASCADE ON UPDATE CASCADE,
	item_id INTEGER REFERENCES delivery.items(id) ON DELETE CASCADE ON UPDATE CASCADE,
	PRIMARY KEY (menu_id, item_id)
);

CREATE TABLE delivery.restaurants (
	id SERIAL PRIMARY KEY,
	name TEXT NOT NULL,
	phone TEXT NOT NULL,
	location POINT NOT NULL,
	menu_id INTEGER REFERENCES delivery.menus(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE delivery.delivery_mans (
	id SERIAL PRIMARY KEY,
	person_id INTEGER REFERENCES delivery.person(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE delivery.customers (
	id SERIAL PRIMARY KEY,
	person_id INTEGER REFERENCES delivery.person(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE delivery.orders (
	id SERIAL PRIMARY KEY,
	date DATE NOT NULL,
	status BOOLEAN NOT NULL DEFAULT FALSE,
	total_price INTEGER NOT NULL,
	restaurant_id INTEGER REFERENCES delivery.restaurants(id) ON DELETE CASCADE ON UPDATE CASCADE,
	delivery_man_id INTEGER REFERENCES delivery.delivery_mans(id) ON DELETE CASCADE ON UPDATE CASCADE,
	customer_id INTEGER REFERENCES delivery.customers(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE delivery.order_items (
	order_item_id SERIAL PRIMARY KEY,
	item_id INTEGER REFERENCES delivery.items(id) ON DELETE CASCADE ON UPDATE CASCADE,
	order_id INTEGER REFERENCES delivery.orders(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO delivery.menus (name) VALUES
('Breakfast Menu'),
('Lunch Menu'),
('Dinner Menu'),
('Kids Menu'),
('Dessert Menu');

INSERT INTO delivery.items (name, description, price) VALUES
('Pancakes', 'Fluffy pancakes with syrup', 10),
('Burger', 'Beef burger with cheese and lettuce', 15),
('Salad', 'Fresh garden salad', 8),
('Pizza', 'Pepperoni pizza with extra cheese', 12),
('Ice Cream', 'Vanilla ice cream with chocolate sauce', 5),
('Chicken Nuggets', 'Crispy chicken nuggets', 7),
('Pasta', 'Spaghetti with marinara sauce', 11),
('Steak', 'Grilled steak with mashed potatoes', 20),
('Smoothie', 'Mixed berry smoothie', 6),
('Fries', 'Crispy french fries', 4);

INSERT INTO delivery.menu_items (menu_id, item_id) VALUES
(1, 1),
(1, 6),
(2, 2),
(2, 3),
(2, 4),
(3, 7),
(3, 8),
(4, 6),
(4, 9),
(5, 5),
(5, 10);

INSERT INTO delivery.restaurants (name, phone, location, menu_id) VALUES
('Sunrise Diner', '123-456-7890', POINT(10, 10), 1),
('City Bistro', '098-765-4321', POINT(10, 20), 2),
('Evening Eats', '555-555-5555', POINT(3, 13), 3),
('Kids Corner', '222-333-4444', POINT(1, 26), 4),
('Sweet Treats', '111-222-3333', POINT(1, 1), 5);

INSERT INTO delivery.person (name, location)
VALUES
	('tomer', POINT(13,2)),
	('neta', POINT(15, 14)),
	('roee', POINT(20, 12)),
	('shai', POINT(1, 20)),
	('neoray', POINT(7, 1)),
	('itamar', POINT(18, 25)),
	('adam', POINT(7, 24));
	
INSERT INTO delivery.delivery_mans (person_id)
VALUES
	(1),
	(2),
	(3),
	(4),
	(6),
	(7);
	
INSERT INTO delivery.customers (person_id)
VALUES
	(5);
