-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 28, 2025 at 04:47 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `eshop`
--

-- --------------------------------------------------------

--
-- Table structure for table `customers`
--

CREATE TABLE `customers` (
  `id` int(10) NOT NULL,
  `firstname` varchar(100) NOT NULL,
  `lastname` varchar(100) NOT NULL,
  `email` varchar(200) NOT NULL,
  `password` varchar(60) DEFAULT NULL,
  `phone` varchar(30) NOT NULL,
  `street_address` varchar(100) NOT NULL,
  `postal_code` varchar(30) NOT NULL,
  `city` varchar(50) NOT NULL,
  `country` varchar(50) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `customers`
--

INSERT INTO `customers` (`id`, `firstname`, `lastname`, `email`, `password`, `phone`, `street_address`, `postal_code`, `city`, `country`, `created_at`) VALUES
(11, 'Kalle', 'Anka', 'kalle.anka@', 'kalleanka123', '0707 090 656', 'Gåsvägen 13', '123 12', 'Ankeborg', 'Sweden', '2025-03-17 15:14:18'),
(12, 'Harry', 'Potter', 'harry.potter@', 'harrypotter123', '0606 303 191', 'Privet Drive 4', '545 12', 'Watford', 'England', '2025-03-17 15:15:21'),
(13, 'Jon', 'Snow', 'jon.snow@gmail.com', 'jonsnow123', '1212 676 937', 'Snow Street 5', '545 66', 'Winterfell', 'Westeros', '2025-03-17 15:16:20'),
(14, 'The', 'President', 'the.president@', 'thepresident123', '9595 030 181', 'Pennsylvania Avenue', '656 33', 'Washington', 'USA', '2025-03-17 15:17:38');

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

CREATE TABLE `orders` (
  `id` int(10) NOT NULL,
  `customer_id` int(10) NOT NULL,
  `total_price` int(5) NOT NULL,
  `payment_status` varchar(30) NOT NULL,
  `payment_id` varchar(200) DEFAULT NULL,
  `order_status` varchar(30) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `order_items`
--

CREATE TABLE `order_items` (
  `id` int(10) NOT NULL,
  `order_id` int(10) NOT NULL,
  `product_id` int(10) NOT NULL,
  `product_name` varchar(100) NOT NULL,
  `quantity` int(5) NOT NULL,
  `unit_price` int(5) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `id` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `price` int(5) NOT NULL,
  `stock` int(4) NOT NULL,
  `category` varchar(100) NOT NULL,
  `image` varchar(200) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `products`
--

INSERT INTO `products` (`id`, `name`, `description`, `price`, `stock`, `category`, `image`, `created_at`) VALUES
(15, 'Needle', 'Looks useless but might get the job done, who knows!', 5, 100, 'Weapons', 'https://www.heromic.se/products/1052/105228/5c260d64ce012.jpg', '2025-03-17 15:19:22'),
(16, 'The Elder Wand', 'Very powerful!', 5, 100, 'Weapons', 'https://i.ebayimg.com/images/g/G4AAAOSwwFBglUXt/s-l1600.webp', '2025-03-17 15:22:49'),
(17, 'Kalle Anka Tidning', 'Very insightful!', 5, 100, 'Educational', 'https://image.bokus.com/images/9789176212912_383x_kalle-anka-jorden-runt-bok-1-syd-amerika_kartonnage', '2025-03-17 15:23:56'),
(18, 'Air Force One', 'The most powerful plane in the entire world!', 10, 100, 'Vehicles', 'https://www.aeroflap.com.br/wp-content/uploads/2023/03/230310-F-AF000-1002-scaled.jpg', '2025-03-17 15:25:26');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `customers`
--
ALTER TABLE `customers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indexes for table `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `order_items`
--
ALTER TABLE `order_items`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_orderItems_orders` (`order_id`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `customers`
--
ALTER TABLE `customers`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=150;

--
-- AUTO_INCREMENT for table `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=117;

--
-- AUTO_INCREMENT for table `order_items`
--
ALTER TABLE `order_items`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=266;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `id` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `order_items`
--
ALTER TABLE `order_items`
  ADD CONSTRAINT `fk_orderItems_orders` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
