-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 05, 2023 at 04:39 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `figma_api`
--

-- --------------------------------------------------------

--
-- Table structure for table `posts`
--

CREATE TABLE `posts` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `cat_id` bigint(20) UNSIGNED NOT NULL,
  `header_id` bigint(20) UNSIGNED NOT NULL,
  `filter_id` bigint(20) UNSIGNED NOT NULL,
  `read_time` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `title` text NOT NULL,
  `slug` text NOT NULL,
  `description` text NOT NULL,
  `preview_title_1` text NOT NULL,
  `preview_title_2` text NOT NULL,
  `preview_title_3` text NOT NULL,
  `preview_title_4` text NOT NULL,
  `preview_title_5` text NOT NULL,
  `preview_title_6` text NOT NULL,
  `preview_title_7` text NOT NULL,
  `preview_title_8` text NOT NULL,
  `preview_title_9` text NOT NULL,
  `preview_title_10` text NOT NULL,
  `preview_title_11` text NOT NULL,
  `preview_title_12` text NOT NULL,
  `preview_image_1` varchar(255) NOT NULL,
  `preview_image_2` varchar(255) NOT NULL,
  `preview_image_3` varchar(255) NOT NULL,
  `preview_image_4` varchar(255) NOT NULL,
  `preview_image_5` varchar(255) NOT NULL,
  `preview_image_6` varchar(255) NOT NULL,
  `preview_image_7` varchar(255) NOT NULL,
  `preview_image_8` varchar(255) NOT NULL,
  `preview_image_9` varchar(255) NOT NULL,
  `preview_image_10` varchar(255) NOT NULL,
  `preview_image_11` varchar(255) NOT NULL,
  `preview_image_12` varchar(255) NOT NULL,
  `file_url` text NOT NULL,
  `preview_url` text NOT NULL,
  `gif_file` text NOT NULL,
  `author_name` text NOT NULL,
  `author_url` text NOT NULL,
  `others` text NOT NULL,
  `views` int(11) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `posts`
--

INSERT INTO `posts` (`id`, `cat_id`, `header_id`, `filter_id`, `read_time`, `image`, `title`, `slug`, `description`, `preview_title_1`, `preview_title_2`, `preview_title_3`, `preview_title_4`, `preview_title_5`, `preview_title_6`, `preview_title_7`, `preview_title_8`, `preview_title_9`, `preview_title_10`, `preview_title_11`, `preview_title_12`, `preview_image_1`, `preview_image_2`, `preview_image_3`, `preview_image_4`, `preview_image_5`, `preview_image_6`, `preview_image_7`, `preview_image_8`, `preview_image_9`, `preview_image_10`, `preview_image_11`, `preview_image_12`, `file_url`, `preview_url`, `gif_file`, `author_name`, `author_url`, `others`, `views`, `created_at`, `updated_at`) VALUES
(1, 4, 2, 6, -1, 'posts/nToXiIHL5AT2tevcLuNW39nEBmLsalU3woVcyNsV.jpg', 'bwgwdwt whhbwuhiw ijwiTFUGHHS OSJISJIWKNNW', 'bwgwdwt-whhbwuhiw-ijwitfughhs-osjisjiwknnw', '<p>hvgghugyvguhb</p>', 'sc-1', 'sc-2', 'sc-3', 'sc-4', 'sc-5', 'sc-6', 'sc-7', 'sc-8', 'sc-9', 'sc-10', 'sc-11', 'sc-12', 'posts/qF8p24TEMppHCCsiEmJmv3hlnUbtq2ffjXMTpv1P.jpg', 'posts/KUlWIU9IkH3DDxzACa0RZI8OEEsMgXT654rGZM4A.jpg', 'posts/e6MccVlmfdaQzFULf1dXr8lhFs4Ucqw547uXeJX8.jpg', 'posts/OOHHW2qiJhXnGjZ7uFkt1ulwKII9jz7hkhsGWdoK.jpg', 'posts/k4WCaBj6VTE5Rz6T6uXEePxCTp04fy605fkIMozw.jpg', 'posts/Z32UEiilk9es2tFMe6lVwuIYj9YHG0JmHD8RywwW.jpg', 'posts/Ha2uiUdmj3s3IA9JgAEs6Vbcr1Q07P1ZoyJ7FaMy.jpg', 'posts/QoilXkiCb6ClmcvkHaFUEu3VD99MGmA6Scbw6oDC.jpg', 'posts/h4YkdSD4Xy3GdSwrUj9u37cNMZ7CFsbF32wPFZfl.jpg', 'posts/aehIIUa7I6sIftHLpPzJdPk56O9gCEtfHXuov1Af.jpg', 'posts/wEr7gBLxta3HfXrZCaOjwopyKv9hbttIiUvwDzNy.jpg', 'posts/NyHRX7GFRr2aFXRHmFvhDhlBAwbASwhFwoKNQTJo.jpg', 'https://reactjsexample.com/azure-chatgpt-private-and-secure-chatgpt-for-internal-enterprise-use/', 'https://reactjsexample.com/azure-chatgpt-private-and-secure-chatgpt-for-internal-enterprise-use/', 'posts/a45ZVGJ5w0s0dgkkAXKxFR6k9NrJj3oLWVjAfJAU.jpg', 'author name', 'https://reactjsexample.com/azure-chatgpt-private-and-secure-chatgpt-for-internal-enterprise-use/', 'https://reactjsexample.com/azure-chatgpt-private-and-secure-chatgpt-for-internal-enterprise-use/', 0, '2023-08-05 08:29:44', '2023-08-05 08:29:44');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
