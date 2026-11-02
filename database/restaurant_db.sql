-- phpMyAdmin SQL Dump
-- version 5.2.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 02, 2026 at 08:52 PM
-- Server version: 10.11.16-MariaDB
-- PHP Version: 8.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `restaurant_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `city`
--

CREATE TABLE `city` (
  `city_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `state` varchar(50) NOT NULL,
  `county` varchar(100) DEFAULT NULL,
  `latitude` decimal(9,6) DEFAULT NULL,
  `longitude` decimal(9,6) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `city`
--

INSERT INTO `city` (`city_id`, `name`, `state`, `county`, `latitude`, `longitude`) VALUES
(1, 'Brooklyn', 'NY', 'Kings County', 40.657000, -73.960060),
(2, 'New York', 'NY', 'New York County', 40.779460, -73.950920),
(3, 'New York City', 'NY', 'New York County', 40.803070, -73.956500),
(4, 'Queens', 'NY', 'Queens County', 40.682740, -73.813020),
(5, 'Rockaway Park', 'NY', 'Queens County', 40.579070, -73.837060),
(6, 'Long Island City', 'NY', 'Queens County', 40.742740, -73.954660),
(7, 'Astoria', 'NY', 'Queens County', 40.755555, -73.927900),
(8, 'Forest Hills', 'NY', 'Queens County', 40.719100, -73.842470),
(9, 'Staten Island', 'NY', 'Richmond County', 40.610650, -74.146145),
(10, 'Bronx', 'NY', 'Bronx County', 40.808625, -73.929155),
(11, 'East Elmhurst', 'NY', 'Queens County', 40.768300, -73.873230),
(12, 'Rockaway', 'NY', 'Queens County', 40.580070, -73.836715),
(13, 'Jackson Heights', 'NY', 'Queens County', 40.755250, -73.887090),
(14, 'Sunnyside', 'NY', 'Queens County', 40.744920, -73.921380),
(15, 'Bayside', 'NY', 'Queens County', 40.756370, -73.767640),
(16, 'Rockaway Beach', 'NY', 'Queens County', 40.586360, -73.816040),
(17, 'The Bronx', 'NY', 'Bronx County', 40.880810, -73.824100),
(18, 'Jamaica', 'NY', 'Queens County', 40.672385, -73.764390),
(19, 'Queens Village', 'NY', 'Queens County', 40.718170, -73.735130),
(20, 'Oakland Gardens', 'NY', 'Queens County', 40.736570, -73.746880),
(21, 'Bushwick', 'NY', 'Kings County', 40.705870, -73.922000),
(22, 'Ridgewood', 'NY', 'Queens County', 40.703010, -73.908360),
(23, 'Little Neck', 'NY', 'Queens County', 40.771080, -73.734840),
(24, 'Flushing', 'NY', 'Queens County', 40.733850, -73.824915),
(25, 'Arverne', 'NY', 'Queens County', 40.590005, -73.797415),
(26, 'Rosedale', 'NY', 'Queens County', 40.674170, -73.736090),
(27, 'Bedford-Stuyvesant', 'NY', 'Kings County', 40.684405, -73.944290),
(28, 'Richmond Hills', 'NY', 'Queens County', 40.689760, -73.844090),
(29, 'Los Angeles', 'CA', 'Los Angeles County', 34.050500, -118.246800),
(30, 'Chicago', 'IL', 'Cook County', 42.008600, -87.693400),
(31, 'Austin', 'TX', 'Travis County', 30.244700, -97.730700),
(32, 'San Francisco', 'CA', 'San Francisco County', 37.797500, -122.407900),
(33, 'Dallas', 'TX', 'Dallas County', 32.786400, -96.782500),
(34, 'Toronto', 'ON', 'Toronto Municipality', 43.646500, -79.395800),
(35, 'Seattle', 'WA', 'King County', 47.610100, -122.342100),
(36, 'Miami', 'FL', 'Miami-Dade County', 25.779600, -80.186700),
(37, 'Newark', 'CA', 'Alameda County', 37.529700, -122.040200),
(38, 'Houston', 'TX', 'Harris County', 29.718900, -95.375200),
(39, 'Vancouver', 'BC', 'Greater Vancouver', 49.279900, -123.101000),
(40, 'Fremont', 'CA', 'Alameda County', 37.526500, -121.970000),
(41, 'Unknown', 'US', 'Unknown', 0.000000, 0.000000);

-- --------------------------------------------------------

--
-- Table structure for table `cuisine`
--

CREATE TABLE `cuisine` (
  `cuisine_id` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `level` int(11) DEFAULT NULL,
  `parent_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `cuisine`
--

INSERT INTO `cuisine` (`cuisine_id`, `name`, `level`, `parent_id`) VALUES
(1, 'Italian', 1, 0),
(2, 'Seafood', 1, 0),
(3, 'French', 1, 0),
(4, 'Spanish', 1, 0),
(5, 'Sushi', 1, 0),
(6, 'Healthy', 1, 0),
(7, 'American', 1, 0),
(8, 'Caribbean', 1, 0),
(9, 'Vietnamese', 1, 0),
(10, 'Pizza', 1, 0),
(11, 'Sandwiches', 1, 0),
(12, 'Mexican', 1, 0),
(13, 'Japanese', 1, 0),
(14, 'Breakfast & brunch', 1, 0),
(15, 'Greek', 1, 0),
(16, 'Chinese', 1, 0),
(17, 'Bakeries', 1, 0),
(18, 'Wine bars', 1, 0),
(19, 'Mediterranean', 1, 0),
(20, 'Cocktail bars', 1, 0),
(21, 'Korean', 1, 0),
(22, 'New american', 1, 0),
(23, 'Tacos', 1, 0),
(24, 'Gluten free options', 1, 0),
(25, 'Modern european', 1, 0),
(26, 'Indian', 1, 0),
(27, 'Bar', 1, 0),
(28, 'Thai', 1, 0),
(29, 'Cafes', 1, 0),
(30, 'Juice & smoothies', 1, 0),
(31, 'Asian', 1, 0),
(32, 'Burgers', 1, 0),
(33, 'Salad', 1, 0),
(34, 'Ice cream & frozen yogurt', 1, 0),
(35, 'Dessert', 1, 0),
(36, 'Venues & event spaces', 1, 0),
(37, 'Chicken shop', 1, 0),
(38, 'Breweries', 1, 0),
(39, 'Dessert & ice cream', 1, 0),
(40, 'Bakery', 1, 0),
(41, 'Cafe', 1, 0),
(42, 'Sandwich', 1, 0),
(43, 'Vegan', 1, 0),
(44, 'Tea rooms', 1, 0),
(45, 'Bbq', 1, 0),
(46, 'General', 1, 0);

-- --------------------------------------------------------

--
-- Table structure for table `restaurant`
--

CREATE TABLE `restaurant` (
  `restaurant_id` varchar(20) NOT NULL,
  `name` varchar(150) NOT NULL,
  `rating` int(11) DEFAULT NULL,
  `price` varchar(30) DEFAULT NULL,
  `dining_options` varchar(30) DEFAULT NULL,
  `city_id` int(11) DEFAULT NULL,
  `cuisine_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `restaurant`
--

INSERT INTO `restaurant` (`restaurant_id`, `name`, `rating`, `price`, `dining_options`, `city_id`, `cuisine_id`) VALUES
('1', 'Bonafini', 5, 'Moderate', 'Both', 1, 1),
('10', 'Melba\'s Restaurant', 4, 'Moderate', 'Both', 3, 7),
('100', 'Market Table', 5, 'Moderate', 'Both', 3, 7),
('101', 'Santo Bruklin', 4, 'Moderate', 'Both', 1, 7),
('102', 'Raclette', 4, 'Moderate', 'Both', 3, 3),
('103', 'MoCA Asian Bistro', 4, 'Moderate', 'Both', 8, 5),
('104', 'Sylk Cove Cocktail Lounge', 5, 'Moderate', 'Both', 1, 7),
('105', 'Nare Sushi', 4, 'Moderate', 'Both', 2, 5),
('106', 'Rizzo\'s Fine Pizza', 4, 'Moderate', 'Both', 7, 10),
('107', 'Trestle', 4, 'Moderate', 'Both', 7, 14),
('108', 'Negril BK', 4, 'Moderate', 'Both', 1, 8),
('109', 'Frankel\'s Delicatessen', 5, 'Moderate', 'Both', 1, 11),
('11', 'Bleu Fin Bar Grill', 4, 'Moderate', 'Both', 1, 8),
('110', 'Shinka Ramen And Sake', 4, 'Moderate', 'Both', 3, 5),
('111', 'Putnam\'s Pub Cooker', 4, 'Moderate', 'Both', 1, 7),
('112', 'Loreley Beer Garden', 4, 'Moderate', 'Both', 2, 25),
('113', 'Doha Bar Lounge', 4, 'Moderate', 'Both', 6, 7),
('114', 'Semma', 4, 'Moderate', 'Both', 2, 26),
('115', 'Sweet Science', 4, 'Moderate', 'Both', 1, 27),
('116', 'Grand Avenue Pizza', 4, 'Moderate', 'Both', 7, 10),
('117', 'Mocha Red', 4, 'Moderate', 'Both', 3, 7),
('118', 'Charlotte Patisserie', 5, 'Moderate', 'Both', 1, 3),
('119', 'Holesome Bagels', 4, 'Moderate', 'Carryout', 1, 10),
('12', 'Home Frite', 4, 'Moderate', 'Carryout', 1, 7),
('120', 'Vineapple', 4, 'Moderate', 'Both', 1, 1),
('121', 'Ricepot Thai Cookhouse', 4, 'Moderate', 'Carryout', 1, 28),
('122', 'Friend Of A Farmer', 4, 'Moderate', 'Both', 3, 7),
('123', 'Kick Axe Throwing', 5, 'Moderate', 'Both', 1, 7),
('124', '43 Bar Grill', 4, 'Moderate', 'Both', 14, 7),
('125', 'Blue Star Parlor', 4, 'Moderate', 'Both', 1, 29),
('126', 'Vida Verde', 4, 'Moderate', 'Both', 2, 12),
('127', 'Taqueria El Patron Mexican Grill', 4, 'Moderate', 'Both', 1, 12),
('128', 'Red Rooster', 4, 'Moderate', 'Both', 2, 7),
('129', 'Barboncino Pizza Bar', 4, 'Moderate', 'Both', 1, 7),
('13', 'John\'s Of 12th Street', 4, 'Moderate', 'Both', 2, 2),
('130', 'Sushi Nonaka', 5, 'Moderate', 'Both', 2, 5),
('131', 'Laterna Restaurant', 4, 'Moderate', 'Both', 15, 19),
('132', 'El Castillo De Jagua', 5, 'Moderate', 'Both', 3, 8),
('133', 'Saraghina Bakery', 4, 'Moderate', 'Both', 1, 7),
('134', 'Oaxaca Taqueria', 4, 'Moderate', 'Both', 1, 12),
('135', 'HAAM Caribbean Plant Cuisine', 4, 'Moderate', 'Premise', 1, 8),
('136', 'Uva', 4, 'Moderate', 'Both', 2, 10),
('137', 'Endswell Bar Bistro', 4, 'Moderate', 'Both', 1, 3),
('138', 'Peppa\'s Jerk Chicken', 4, 'Moderate', 'Both', 1, 8),
('139', 'Gage And Tollner', 4, 'Moderate', 'Premise', 1, 2),
('14', 'Cowgirl Seahorse', 4, 'Moderate', 'Both', 2, 7),
('140', 'Manousheh', 4, 'Moderate', 'Both', 2, 26),
('141', 'Fish Cheeks', 5, 'Moderate', 'Both', 2, 2),
('142', 'Edith\'s Sandwich Counter', 4, 'Moderate', 'Carryout', 1, 17),
('143', 'Bocaphe', 5, 'Moderate', 'Both', 3, 9),
('144', 'Toast', 4, 'Moderate', 'Both', 2, 7),
('145', 'Sunday In Brooklyn', 4, 'Moderate', 'Both', 1, 7),
('146', 'Luna Rossa', 4, 'Moderate', 'Both', 2, 1),
('147', 'Kimo\'s', 5, 'Moderate', 'Both', 16, 19),
('148', 'Empanada Loca', 4, 'Moderate', 'Both', 1, 7),
('149', 'Boris Horton', 5, 'Moderate', 'Both', 2, 14),
('15', 'Mama Pho', 4, 'Moderate', 'Both', 1, 9),
('150', 'Il Gattopardo', 4, 'Moderate', 'Both', 2, 1),
('151', '5 Burro Cafe', 4, 'Moderate', 'Carryout', 8, 12),
('152', 'Sylvia\'s Restaurant', 4, 'Moderate', 'Both', 2, 7),
('153', 'Bobos Crab Shack', 4, 'Moderate', 'Both', 17, 7),
('154', 'Glacé', 4, 'Moderate', 'Both', 18, 30),
('155', 'Calexico', 4, 'Moderate', 'Both', 2, 12),
('156', 'Haswell Green\'s', 5, 'Moderate', 'Both', 2, 7),
('157', 'District Saigon', 5, 'Moderate', 'Both', 7, 9),
('158', 'Seppe Pizza Bar', 4, 'Moderate', 'Both', 9, 10),
('159', 'Bobo\'s Crab Shack', 4, 'Moderate', 'Carryout', 2, 7),
('16', 'Casa Ora', 5, 'Moderate', 'Both', 1, 4),
('160', 'Spicy Moon West Village', 4, 'Moderate', 'Both', 2, 16),
('161', 'Cafe Katja', 5, 'Moderate', 'Premise', 3, 7),
('162', 'Tonchin', 4, 'Moderate', 'Both', 2, 13),
('163', 'Allswell', 4, 'Moderate', 'Both', 1, 7),
('164', 'Little Honey', 4, 'Moderate', 'Carryout', 1, 10),
('165', 'Santa Fe Restaurant', 4, 'Moderate', 'Both', 3, 12),
('166', 'Tacuba Hell\'s Kitchen', 4, 'Moderate', 'Both', 2, 12),
('167', 'Isla Co', 4, 'Moderate', 'Both', 1, 7),
('168', 'Island Provisions', 5, 'Moderate', 'Carryout', 19, 7),
('169', 'Hot Peppers', 5, 'Moderate', 'Both', 20, 12),
('17', 'El Castillo Del Pollo', 4, 'Moderate', 'Carryout', 4, 4),
('170', 'Jerrell\'s BETR BRGR', 5, 'Moderate', 'Both', 2, 7),
('171', 'Slice', 3, 'Moderate', 'Both', 7, 10),
('172', 'Kalye', 4, 'Moderate', 'Both', 3, 31),
('173', 'Orwashers', 4, 'Moderate', 'Both', 2, 7),
('174', 'Brooklyn Pizza Crew', 4, 'Moderate', 'Both', 1, 10),
('175', 'Sanger Hall', 4, 'Moderate', 'Both', 14, 32),
('176', 'Thai Hot Box', 4, 'Moderate', 'Both', 2, 28),
('177', 'Serendipity 3', 4, 'Moderate', 'Premise', 3, 7),
('178', 'King Souvlaki', 4, 'Moderate', 'Both', 1, 19),
('179', 'Wolf Lamb Steakhouse', 4, 'Moderate', 'Both', 2, 7),
('18', 'Sound Fury Brewery And Kitchen', 4, 'Moderate', 'Both', 1, 10),
('180', 'The Clam', 4, 'Moderate', 'Both', 2, 7),
('181', 'Eleni\'s', 4, 'Moderate', 'Both', 2, 19),
('182', 'King Of Falafel Shawarma', 4, 'Moderate', 'Carryout', 7, 19),
('183', 'Au Cheval', 4, 'Moderate', 'Both', 2, 7),
('184', 'Anejo', 4, 'Moderate', 'Both', 3, 12),
('185', 'The Cobra Club', 4, 'Moderate', 'Both', 21, 7),
('186', 'Glin Thai Bistro', 5, 'Moderate', 'Both', 1, 28),
('187', 'Trattoria Vento', 4, 'Moderate', 'Carryout', 9, 10),
('188', 'Bottling', 4, 'Moderate', 'Both', 2, 7),
('189', 'The Heights Bar Grill', 4, 'Moderate', 'Both', 2, 7),
('19', 'Veselka', 5, 'Moderate', 'Both', 2, 11),
('190', 'RedFarm', 4, 'Moderate', 'Both', 2, 16),
('191', 'Overgreens Salads Juice', 4, 'Moderate', 'Carryout', 1, 33),
('192', 'Blend On The Water', 4, 'Moderate', 'Both', 6, 4),
('193', 'Bungalow Bar', 4, 'Moderate', 'Both', 4, 2),
('194', 'Bagel Market', 4, 'Moderate', 'Both', 2, 7),
('195', 'Tampopo Kitchen', 4, 'Moderate', 'Carryout', 2, 5),
('196', 'Baby Brasa', 4, 'Moderate', 'Both', 2, 2),
('197', 'American Brass', 4, 'Moderate', 'Both', 6, 7),
('198', 'Mighty Quinn\'s Barbeque', 4, 'Moderate', 'Both', 3, 7),
('199', 'Drinkology NYC', 4, 'Moderate', 'Carryout', 4, 20),
('2', 'Indian Table', 5, 'Moderate', 'Both', 1, 2),
('20', 'The Empanada Spot Williamsburg', 4, 'Moderate', 'Both', 1, 7),
('200', 'Roey\'s', 4, 'Moderate', 'Both', 2, 10),
('201', 'Meadowsweet', 4, 'Moderate', 'Both', 1, 7),
('202', 'Mayfield', 4, 'Moderate', 'Both', 1, 7),
('203', 'The Nourish Spot', 4, 'Moderate', 'Both', 18, 33),
('204', 'PLG Coffee House And Tavern', 4, 'Moderate', 'Both', 1, 11),
('205', 'Egger\'s', 4, 'Moderate', 'Carryout', 9, 34),
('206', 'Bin 71', 4, 'Moderate', 'Premise', 3, 27),
('207', 'FIG OLIVE', 4, 'Moderate', 'Both', 2, 19),
('208', 'Rosie Pizza Bar', 4, 'Moderate', 'Both', 2, 7),
('209', 'Birds Of A Feather', 5, 'Moderate', 'Both', 1, 16),
('21', 'The Cactus Shop', 5, 'Moderate', 'Both', 3, 12),
('210', 'Bazár Tapas Bar Restaurant', 4, 'Moderate', 'Both', 2, 2),
('211', 'Sip And Co', 4, 'Moderate', 'Both', 2, 35),
('212', 'Two Boots', 4, 'Moderate', 'Both', 2, 7),
('213', 'Jungle Cafe', 5, 'Moderate', 'Both', 1, 12),
('214', 'Neta Shari', 5, 'Moderate', 'Carryout', 1, 5),
('215', 'Malii', 5, 'Moderate', 'Carryout', 2, 28),
('216', 'MATTER', 4, 'Moderate', 'Both', 1, 14),
('217', 'Balvanera', 5, 'Moderate', 'Both', 2, 18),
('218', 'L\'Wren', 5, 'Moderate', 'Both', 1, 36),
('219', 'Truth Resturant And Lounge', 4, 'Moderate', 'Carryout', 4, 8),
('22', 'The Meat Up Grill', 4, 'Moderate', 'Both', 5, 7),
('220', 'Izakaya Juraku', 5, 'Moderate', 'Both', 2, 13),
('221', 'Mighty Quinn\'s Barbeque', 4, 'Moderate', 'Both', 3, 7),
('222', 'Mesa Azteca', 4, 'Moderate', 'Both', 1, 12),
('223', 'Sammich Shop', 5, 'Moderate', 'Carryout', 1, 11),
('224', 'Glasserie', 4, 'Moderate', 'Both', 1, 19),
('225', 'Casa Carmen', 4, 'Moderate', 'Both', 3, 12),
('226', 'Tacovision', 4, 'Moderate', 'Both', 2, 12),
('227', 'Threes Brewing', 5, 'Moderate', 'Premise', 1, 7),
('228', 'Carnegie Diner Cafe', 4, 'Moderate', 'Both', 2, 7),
('229', 'D\'antigua', 4, 'Moderate', 'Both', 4, 7),
('23', 'Ozakaya', 4, 'Moderate', 'Both', 1, 5),
('230', 'Rule Of Thirds', 4, 'Moderate', 'Both', 1, 13),
('231', 'Cachapas Y Mas', 4, 'Moderate', 'Both', 22, 11),
('232', 'Miti Miti', 4, 'Moderate', 'Both', 1, 12),
('233', 'Danji', 4, 'Moderate', 'Both', 3, 21),
('234', 'Otway', 4, 'Moderate', 'Both', 1, 7),
('235', 'Tacoway Beach', 4, 'Moderate', 'Premise', 16, 12),
('236', 'La Puerta Roja', 4, 'Moderate', 'Both', 1, 12),
('237', 'Masseria East', 4, 'Moderate', 'Both', 3, 10),
('238', 'Brown Sugar Restaurant', 4, 'Moderate', 'Both', 2, 8),
('239', 'Norm\'s Pizza', 5, 'Moderate', 'Both', 1, 7),
('24', 'Pier I Cafe Espresso Bar', 4, 'Moderate', 'Both', 3, 7),
('240', 'Chelas', 4, 'Moderate', 'Carryout', 2, 37),
('241', 'Gertie', 4, 'Moderate', 'Both', 1, 7),
('242', 'D\'Garden Caribbean Bar Grill', 3, 'Moderate', 'Both', 1, 8),
('243', 'Holy Schnitzel', 4, 'Moderate', 'Both', 9, 7),
('244', 'Isabelle\'s Osteria', 5, 'Moderate', 'Both', 3, 19),
('245', 'Sweet Chick', 4, 'Moderate', 'Both', 2, 7),
('246', 'Savvy Bistro Bar', 5, 'Moderate', 'Both', 1, 8),
('247', 'Barachou', 5, 'Moderate', 'Both', 2, 3),
('248', 'Vesta', 4, 'Moderate', 'Both', 7, 1),
('249', 'Il Bacco Ristorante', 4, 'Moderate', 'Both', 23, 10),
('25', 'Takumen', 4, 'Moderate', 'Both', 6, 13),
('250', 'Arirang Hibachi Steakhouse', 4, 'Moderate', 'Both', 9, 5),
('251', 'Stocked Cafe', 4, 'Moderate', 'Both', 1, 11),
('252', 'Clinton Hall', 4, 'Moderate', 'Both', 2, 7),
('253', 'Kills Boro Brewing', 4, 'Moderate', 'Both', 9, 38),
('254', 'Frying Pan Brooklyn', 5, 'Moderate', 'Both', 1, 7),
('255', 'THEP Thai Restaurant', 5, 'Moderate', 'Both', 2, 28),
('256', 'The Upper Crust', 2, 'Moderate', 'Carryout', 24, 10),
('257', 'Saiguette', 5, 'Moderate', 'Both', 2, 9),
('258', 'Claudette\'s', 4, 'Moderate', 'Both', 25, 7),
('259', 'Nerai', 4, 'Moderate', 'Both', 2, 2),
('26', 'Dive Bar LIC', 4, 'Moderate', 'Both', 7, 12),
('260', 'Osteria La Baia', 4, 'Moderate', 'Both', 2, 3),
('261', 'Republic Latin Fusion', 4, 'Moderate', 'Both', 1, 5),
('262', 'Kokomo', 4, 'Moderate', 'Both', 1, 8),
('263', 'Pappardella', 4, 'Moderate', 'Both', 3, 10),
('264', 'Azabu New York', 4, 'Moderate', 'Both', 2, 5),
('265', 'Choice Market Bar And Restaurant', 4, 'Moderate', 'Both', 1, 39),
('266', 'Nami Nori', 4, 'Moderate', 'Both', 2, 5),
('267', 'Medusa The Greek', 5, 'Moderate', 'Both', 1, 15),
('268', 'Caribbean Soul Rooftop Restaurant Lounge', 4, 'Moderate', 'Both', 26, 2),
('269', 'The Hudson', 3, 'Moderate', 'Both', 2, 7),
('27', 'JoJu', 4, 'Moderate', 'Both', 2, 9),
('270', 'Doughnut Plant', 4, 'Moderate', 'Both', 6, 7),
('271', 'Nagle\'s Bagels', 4, 'Moderate', 'Carryout', 27, 40),
('272', 'The Butcher\'s Daughter', 4, 'Moderate', 'Both', 2, 7),
('273', 'Gazala\'s', 4, 'Moderate', 'Both', 2, 19),
('274', 'Socarrat Paella Bar', 4, 'Moderate', 'Both', 2, 19),
('275', 'Kiosko 787', 4, 'Moderate', 'Both', 1, 4),
('276', 'The Bonnie', 4, 'Moderate', 'Both', 7, 7),
('277', 'Yummy Thai', 4, 'Moderate', 'Both', 2, 28),
('278', 'Massawa', 5, 'Moderate', 'Both', 2, 6),
('279', 'The Shady Lady', 4, 'Moderate', 'Both', 7, 7),
('28', 'Cruz Del Sur', 5, 'Moderate', 'Both', 1, 12),
('280', 'Noodle Lane And Dumplings', 5, 'Moderate', 'Carryout', 1, 16),
('281', 'Mole Mexican Restaurant Tequileria', 4, 'Moderate', 'Both', 3, 12),
('282', 'Yasouvlaki', 5, 'Moderate', 'Both', 2, 15),
('283', 'Locanda Vini E Olii', 4, 'Moderate', 'Both', 1, 1),
('284', 'PJ Clarke\'s', 4, 'Moderate', 'Both', 2, 7),
('285', 'Em Vietnamese Bistro', 5, 'Moderate', 'Both', 1, 9),
('286', 'Crif Dogs', 4, 'Moderate', 'Both', 2, 7),
('287', 'Bustan', 4, 'Moderate', 'Both', 2, 15),
('288', 'Just Pho You', 4, 'Moderate', 'Both', 2, 9),
('289', 'Heat Caribbean Kitchen Lounge', 4, 'Moderate', 'Both', 28, 8),
('29', 'Motel No Tell', 5, 'Moderate', 'Both', 2, 14),
('290', 'Puertas', 4, 'Moderate', 'Both', 1, 4),
('291', 'Esme', 4, 'Moderate', 'Both', 1, 7),
('292', 'Cafe Grumpy', 4, 'Moderate', 'Both', 2, 41),
('293', 'Fresco\'s Cantina', 5, 'Moderate', 'Both', 7, 8),
('294', 'La Brochette Kosher Steakhouse', 4, 'Moderate', 'Both', 3, 5),
('295', 'Astoria Bakery Cafe', 4, 'Moderate', 'Both', 7, 42),
('296', 'Ilili Restaurant', 5, 'Moderate', 'Both', 2, 19),
('297', 'Halal Grill Bros Brooklyn', 4, 'Moderate', 'Carryout', 1, 26),
('298', 'Elite Cafe', 4, 'Moderate', 'Both', 24, 10),
('299', 'Fig Olive', 4, 'Moderate', 'Both', 2, 19),
('3', 'Cafe D\'Alsace', 4, 'Moderate', 'Both', 2, 3),
('30', 'Dear Mama', 3, 'Moderate', 'Both', 2, 14),
('300', 'The Consulate', 4, 'Moderate', 'Both', 2, 7),
('301', 'Valla Table', 5, 'Moderate', 'Both', 2, 28),
('302', 'Awesum Dimsum', 5, 'Moderate', 'Both', 2, 16),
('303', 'Urban Dessert Lab', 4, 'Moderate', 'Carryout', 2, 43),
('304', 'Russ Daughters', 4, 'Moderate', 'Carryout', 2, 7),
('305', 'Settepani', 4, 'Moderate', 'Both', 2, 1),
('306', 'The Honey Well', 4, 'Moderate', 'Premise', 2, 7),
('307', 'Barano', 5, 'Moderate', 'Both', 1, 10),
('308', 'Los Tacos No 1', 5, 'Moderate', 'Both', 2, 12),
('309', 'Trapizzino', 4, 'Moderate', 'Both', 2, 10),
('31', 'Olea', 4, 'Moderate', 'Both', 1, 15),
('310', 'Orwashers', 4, 'Moderate', 'Carryout', 2, 7),
('311', 'Lighthouse Fish Market', 4, 'Moderate', 'Both', 2, 2),
('312', 'Plein Air', 5, 'Moderate', 'Both', 22, 7),
('313', 'Olde Brooklyn Bagel Shoppe', 4, 'Moderate', 'Carryout', 1, 7),
('314', 'S\'MAC', 4, 'Moderate', 'Both', 2, 7),
('315', 'Mr Banh Mi', 5, 'Moderate', 'Both', 1, 9),
('316', 'Di An Di', 4, 'Moderate', 'Both', 1, 9),
('317', 'Pizza Heights', 4, 'Moderate', 'Both', 2, 10),
('318', 'One More Charm', 5, 'Moderate', 'Both', 1, 28),
('319', 'Socarrat Paella Bar', 4, 'Moderate', 'Both', 2, 19),
('32', 'Burger Heights', 4, 'Moderate', 'Both', 2, 7),
('320', 'Buttermilk Channel', 4, 'Moderate', 'Both', 1, 7),
('321', 'Aita', 5, 'Moderate', 'Both', 1, 1),
('322', 'Boqueria W40th', 4, 'Moderate', 'Both', 2, 19),
('323', 'Ainslie', 4, 'Moderate', 'Both', 1, 10),
('324', 'Tiny\'s Cantina', 4, 'Moderate', 'Both', 1, 2),
('325', 'Juliana\'s', 5, 'Moderate', 'Both', 1, 10),
('326', 'Heidi\'s House By The Side Of The Road', 5, 'Moderate', 'Both', 2, 7),
('327', 'Lupa', 4, 'Moderate', 'Both', 2, 1),
('328', 'Hilltop Park Alehouse', 4, 'Moderate', 'Both', 2, 7),
('329', 'Nippon Cha', 4, 'Moderate', 'Both', 1, 44),
('33', 'Spy C Cuisine', 4, 'Moderate', 'Both', 8, 16),
('330', 'Chez Nick', 4, 'Moderate', 'Both', 2, 7),
('331', 'Antun\'s The Restaurant', 5, 'Moderate', 'Both', 4, 8),
('332', 'Ako', 4, 'Moderate', 'Both', 1, 5),
('333', 'Katana Sushi', 4, 'Moderate', 'Carryout', 1, 13),
('334', 'La Ñapa', 5, 'Moderate', 'Both', 1, 2),
('335', 'Pico', 5, 'Moderate', 'Both', 12, 12),
('336', 'B2runch', 4, 'Moderate', 'Both', 2, 2),
('337', 'The Horny Ram', 4, 'Moderate', 'Both', 2, 7),
('338', 'Nowon', 4, 'Moderate', 'Both', 2, 21),
('339', 'Mission Sandwich Social', 5, 'Moderate', 'Carryout', 1, 11),
('34', 'Red Paper Clip', 4, 'Moderate', 'Both', 2, 16),
('340', 'Socarrat Paella Bar', 4, 'Moderate', 'Both', 2, 19),
('341', 'Tampopo Ramen', 4, 'Moderate', 'Both', 2, 13),
('342', 'Edie Jo\'s', 4, 'Moderate', 'Both', 1, 14),
('343', 'Nick\'s Lobster House', 4, 'Moderate', 'Both', 1, 2),
('344', 'Camillo', 5, 'Moderate', 'Both', 1, 10),
('345', 'Arco Cafe', 5, 'Moderate', 'Both', 2, 10),
('346', 'Chiflez', 4, 'Moderate', 'Carryout', 13, 12),
('347', 'Miznon', 4, 'Moderate', 'Both', 2, 15),
('348', 'Tanner Smiths', 4, 'Moderate', 'Both', 2, 7),
('349', 'Little Tiffin', 4, 'Moderate', 'Both', 1, 28),
('35', 'Jasmine\'s Caribbean Cuisine', 4, 'Moderate', 'Both', 2, 8),
('350', 'Fonda Park Slope', 4, 'Moderate', 'Both', 1, 12),
('351', 'Citrico Cafe', 4, 'Moderate', 'Both', 4, 12),
('352', 'Burger Co. #4021', 4, 'Moderate', 'Both', 2, 7),
('353', 'Pizza House - Downtown LA', 5, 'Moderate', 'Both', 29, 1),
('354', 'Curry Point Express', 4, 'Moderate', 'Both', 30, 26),
('355', 'Sushi Bar Midtown', 4, 'High', 'Both', 2, 13),
('356', 'Taco Fiesta #118', 4, 'Low', 'Both', 31, 12),
('357', 'Noodle House SF', 4, 'Moderate', 'Both', 32, 16),
('358', 'Grill Master BBQ', 5, 'Moderate', 'Both', 33, 45),
('359', 'Wok & Roll', 4, 'Moderate', 'Both', 34, 16),
('36', 'DiLeo\'s Pizzeria', 4, 'Moderate', 'Both', 9, 10),
('360', 'Cafe Delight', 5, 'Low', 'Both', 35, 41),
('361', 'Punjabi Tadka', 4, 'Moderate', 'Both', 30, 26),
('362', 'Ocean Grill Miami', 4, 'High', 'Both', 36, 2),
('363', 'Dragon Wok', 4, 'Low', 'Both', 30, 16),
('364', 'Pasta Palace NYC', 4, 'High', 'Both', 2, 1),
('365', 'Spice Route Bay Area', 4, 'Moderate', 'Both', 37, 26),
('366', 'Grill Master BBQ - Houston', 5, 'Moderate', 'Both', 38, 45),
('367', 'Cafe Delight - Brooklyn', 5, 'Low', 'Both', 1, 41),
('368', 'Burger Co. #2210', 4, 'Moderate', 'Both', 29, 7),
('369', 'Taco Fiesta #205', 4, 'Low', 'Both', 29, 12),
('37', 'Billy\'s Bakery', 4, 'Moderate', 'Premise', 3, 17),
('370', 'Sushi Bar Chelsea', 5, 'High', 'Both', 2, 13),
('371', 'Noodle House - Vancouver', 4, 'Moderate', 'Both', 39, 16),
('372', 'Curry Point Express - Fremont', 4, 'Moderate', 'Both', 40, 26),
('373', 'Grill Master BBQ - Austin', 5, 'Moderate', 'Both', 31, 45),
('374', 'Pizza House - Brooklyn', 5, 'Moderate', 'Both', 1, 1),
('375', 'Ocean Grill Chicago', 4, 'High', 'Both', 30, 2),
('376', 'Dragon Wok - Seattle', 4, 'Low', 'Both', 35, 16),
('377', 'Unknown Restaurant', 4, 'Moderate', 'Both', 41, 46),
('378', 'Sample/demo data for illustration  not a live scrape or licensed dataset extract. Names, addresses, phone numbers, and GPS coordinates are fictional ', 4, 'Moderate', 'Both', 41, 46),
('38', 'Colonia Verde', 4, 'Moderate', 'Both', 1, 7),
('39', 'Daily Provisions', 5, 'Moderate', 'Both', 2, 7),
('4', 'Cachapas Y Mas', 4, 'Moderate', 'Both', 2, 4),
('40', 'Kahlo', 4, 'Moderate', 'Both', 2, 12),
('41', 'Bedford Gourmet Food', 4, 'Moderate', 'Both', 1, 5),
('42', 'At The Wallace', 4, 'Moderate', 'Both', 2, 7),
('43', 'Rustik Tavern', 4, 'Moderate', 'Both', 1, 7),
('44', 'Barrio Chino', 4, 'Moderate', 'Both', 3, 12),
('45', 'The Good Fork Pub', 4, 'Moderate', 'Both', 1, 7),
('46', 'Casita', 5, 'Moderate', 'Both', 1, 18),
('47', 'Prime 623', 4, 'Moderate', 'Both', 1, 8),
('48', 'Miss Ada', 5, 'Moderate', 'Both', 1, 19),
('49', 'Dollar Hits', 5, 'Moderate', 'Both', 2, 2),
('5', 'Hibino', 4, 'Moderate', 'Both', 1, 5),
('50', 'Tabernacle Steakhouse', 4, 'Moderate', 'Both', 2, 7),
('51', 'MAiSONETTA', 5, 'Moderate', 'Both', 10, 12),
('52', 'Thyme Bar', 3, 'Moderate', 'Premise', 2, 20),
('53', 'Norma', 4, 'Moderate', 'Both', 2, 5),
('54', 'Bobwhite Counter', 5, 'Moderate', 'Both', 2, 7),
('55', 'Chela', 5, 'Moderate', 'Both', 1, 12),
('56', 'Her Name Is Han', 4, 'Moderate', 'Both', 2, 21),
('57', 'Antonio\'s Trattoria', 5, 'Moderate', 'Both', 10, 10),
('58', 'Golden Diner', 5, 'Moderate', 'Both', 2, 7),
('59', 'The Ainsworth', 4, 'Moderate', 'Both', 3, 7),
('6', 'Perk Coffee', 4, 'Moderate', 'Both', 2, 6),
('60', 'Corner Cafe Bakery', 4, 'Moderate', 'Both', 10, 7),
('61', 'Bar Camillo', 5, 'Moderate', 'Both', 1, 10),
('62', 'LaGuardia Cafe', 4, 'Moderate', 'Both', 11, 4),
('63', 'Evo Cocktail Lounge Restaurant', 4, 'Moderate', 'Both', 10, 7),
('64', 'Kubeh', 4, 'Moderate', 'Both', 2, 19),
('65', 'Alta Calidad', 4, 'Moderate', 'Both', 1, 12),
('66', 'Black Tap', 4, 'Moderate', 'Both', 2, 7),
('67', 'Turk\'s Inn', 4, 'Moderate', 'Both', 1, 11),
('68', 'Plum Vietnamese Restaurant', 4, 'Moderate', 'Both', 2, 9),
('69', 'Mojo Restaurant', 4, 'Moderate', 'Both', 8, 4),
('7', 'Black Oak On Fifth', 4, 'Moderate', 'Both', 1, 1),
('70', 'Ras Plant Based', 5, 'Moderate', 'Both', 1, 6),
('71', 'Trad Room', 5, 'Moderate', 'Both', 1, 13),
('72', 'Portale', 5, 'Moderate', 'Both', 2, 19),
('73', 'Arden', 5, 'Moderate', 'Both', 1, 22),
('74', 'Beach Cafe', 4, 'Moderate', 'Both', 2, 7),
('75', 'Europa Pizzeria', 4, 'Moderate', 'Both', 1, 10),
('76', 'San Pedro Inn', 4, 'Moderate', 'Both', 1, 23),
('77', 'La Flor De Izucar Cafe', 4, 'Moderate', 'Carryout', 1, 12),
('78', 'Bubby\'s', 4, 'Moderate', 'Both', 2, 7),
('79', 'La Esquina', 4, 'Moderate', 'Both', 2, 12),
('8', 'Amarin Cafe', 4, 'Moderate', 'Both', 1, 5),
('80', 'Blend', 4, 'Moderate', 'Both', 7, 16),
('81', 'Martha\'s Cocina Mexicana', 4, 'Moderate', 'Premise', 1, 12),
('82', 'Rocco\'s Of Roc Beach Coal Brick Oven Pizza', 5, 'Moderate', 'Both', 12, 10),
('83', 'The Queensboro', 4, 'Moderate', 'Both', 13, 7),
('84', 'Fresco By Scotto', 4, 'Moderate', 'Both', 2, 1),
('85', 'Go! Go! Curry!', 4, 'Moderate', 'Both', 2, 13),
('86', 'Santa Panza', 5, 'Moderate', 'Both', 1, 7),
('87', 'Kings Of Kobe', 5, 'Moderate', 'Both', 2, 7),
('88', 'The Original John\'s Deli', 4, 'Moderate', 'Both', 1, 7),
('89', 'Andrew Bellucci\'s Pizzeria', 5, 'Moderate', 'Both', 7, 7),
('9', 'Sea Wolf', 4, 'Moderate', 'Both', 1, 7),
('90', 'Tuscan Hills', 4, 'Moderate', 'Both', 8, 10),
('91', 'Loreto Italian Kitchen Bar', 4, 'Moderate', 'Both', 1, 10),
('92', 'Bronx Alehouse', 4, 'Moderate', 'Both', 10, 7),
('93', 'Pinto Garden', 4, 'Moderate', 'Both', 3, 7),
('94', 'Hanoi House', 4, 'Moderate', 'Both', 3, 9),
('95', 'Los Tacos No 1', 5, 'Moderate', 'Both', 2, 12),
('96', 'Han Dynasty', 4, 'Moderate', 'Both', 2, 16),
('97', 'Abilene', 4, 'Moderate', 'Both', 1, 7),
('98', 'Beija Flor', 4, 'Moderate', 'Both', 6, 24),
('99', 'VeganHood', 5, 'Moderate', 'Both', 2, 7);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `city`
--
ALTER TABLE `city`
  ADD PRIMARY KEY (`city_id`);

--
-- Indexes for table `cuisine`
--
ALTER TABLE `cuisine`
  ADD PRIMARY KEY (`cuisine_id`),
  ADD KEY `parent_id` (`parent_id`);

--
-- Indexes for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD PRIMARY KEY (`restaurant_id`),
  ADD KEY `city_id` (`city_id`),
  ADD KEY `cuisine_id` (`cuisine_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `city`
--
ALTER TABLE `city`
  MODIFY `city_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `cuisine`
--
ALTER TABLE `cuisine`
  MODIFY `cuisine_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `cuisine`
--
ALTER TABLE `cuisine`
  ADD CONSTRAINT `cuisine_ibfk_1` FOREIGN KEY (`parent_id`) REFERENCES `cuisine` (`cuisine_id`);

--
-- Constraints for table `restaurant`
--
ALTER TABLE `restaurant`
  ADD CONSTRAINT `restaurant_ibfk_1` FOREIGN KEY (`city_id`) REFERENCES `city` (`city_id`),
  ADD CONSTRAINT `restaurant_ibfk_2` FOREIGN KEY (`cuisine_id`) REFERENCES `cuisine` (`cuisine_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
