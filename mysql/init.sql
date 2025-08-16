CREATE DATABASE IF NOT EXISTS demo;
USE demo;

-- Tabla principal de órdenes
CREATE TABLE orders (
    id INT PRIMARY KEY,
    country VARCHAR(50),
    total DECIMAL(10,2)
);

-- Tabla de items por orden
CREATE TABLE order_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    order_id INT,
    sku VARCHAR(10),
    qty INT,
    FOREIGN KEY (order_id) REFERENCES orders(id)
);

-- Insertar órdenes
INSERT INTO orders (id, country, total) VALUES
(1, 'Colombia', 16.5),
(2, 'México', 12.75),
(3, 'Perú', 18.0),
(4, 'Chile', 25.0),
(5, 'Colombia', 22.0),
(6, 'México', 15.5),
(7, 'Argentina', 40.0),
(8, 'Perú', 28.0),
(9, 'Colombia', 8.5),
(10, 'México', 21.0),
(11, 'Chile', 20.5),
(12, 'Argentina', 30.0),
(13, 'Perú', 20.0),
(14, 'Colombia', 19.0),
(15, 'México', 32.0);

-- Insertar items
INSERT INTO order_items (order_id, sku, qty) VALUES
(1, 'CFA', 2), (1, 'CAF', 1),
(2, 'CAC', 3),
(3, 'QIN', 1), (3, 'CAF', 2),
(4, 'CAF', 5),
(5, 'CFA', 1), (5, 'QIN', 2),
(6, 'CAF', 2), (6, 'CAC', 1),
(7, 'QIN', 4),
(8, 'CAF', 1), (8, 'CFA', 3),
(9, 'CAC', 2),
(10, 'QIN', 2), (10, 'CFA', 1),
(11, 'CAF', 2), (11, 'CAC', 2),
(12, 'CFA', 2), (12, 'CAF', 2),
(13, 'CAC', 5),
(14, 'CAF', 3), (14, 'QIN', 1),
(15, 'CFA', 4);
