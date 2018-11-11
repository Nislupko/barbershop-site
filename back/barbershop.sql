-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Ноя 11 2018 г., 13:19
-- Версия сервера: 10.1.31-MariaDB
-- Версия PHP: 7.2.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `barbershop`
--

-- --------------------------------------------------------

--
-- Структура таблицы `booking`
--

CREATE TABLE `booking` (
  `id` int(11) NOT NULL,
  `user` int(11) NOT NULL,
  `visitDate` date NOT NULL,
  `visitTime` time NOT NULL,
  `service` varchar(10) DEFAULT 'cutting'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `booking`
--

INSERT INTO `booking` (`id`, `user`, `visitDate`, `visitTime`, `service`) VALUES
(1, 1, '2018-12-05', '15:00:00', 'cutting'),
(2, 1, '2018-12-05', '18:00:00', 'shaving'),
(3, 1, '2018-11-11', '12:00:00', 'cutting'),
(6, 1, '2018-11-11', '13:00:00', 'cutting'),
(8, 1, '2018-11-11', '14:00:00', 'cutting'),
(43, 1, '2018-11-07', '11:00:00', 'Shaving'),
(44, 1, '2018-11-07', '12:00:00', 'Royal shav'),
(45, 1, '2018-11-20', '21:00:00', 'Haircut'),
(46, 1, '2018-11-25', '19:00:00', 'Royal shav'),
(50, 1, '2018-12-05', '09:00:00', 'Haircut'),
(51, 1, '2018-12-05', '16:00:00', 'Other'),
(52, 1, '2018-11-07', '09:00:00', 'Haircut'),
(58, 1, '2018-11-07', '10:00:00', 'Haircut'),
(60, 1, '2018-11-08', '09:00:00', 'Haircut'),
(63, 1, '2018-11-08', '10:00:00', 'Haircut'),
(66, 1, '2018-11-08', '11:00:00', 'Haircut'),
(69, 1, '2018-11-08', '12:00:00', 'Haircut'),
(72, 1, '2018-11-08', '14:00:00', 'Haircut'),
(74, 1, '2018-11-08', '13:00:00', 'Royal shav'),
(75, 1, '2018-11-08', '15:00:00', 'Other'),
(76, 1, '2018-11-08', '16:00:00', 'Haircut'),
(79, 1, '2018-11-08', '17:00:00', 'Haircut'),
(80, 1, '2018-11-08', '19:00:00', 'Haircut'),
(81, 1, '2018-11-08', '18:00:00', 'Haircut'),
(83, 1, '2018-11-08', '20:00:00', 'Haircut'),
(86, 1, '2018-11-09', '09:00:00', 'Haircut'),
(88, 1, '2018-11-09', '10:00:00', 'Haircut');

-- --------------------------------------------------------

--
-- Структура таблицы `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `name` varchar(32) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `user`
--

INSERT INTO `user` (`id`, `name`, `email`, `password`) VALUES
(1, 'admin', 'nislupko@gmail.com', '21232f297a57a5a743894a0e4a801fc3'),
(2, 'user1', 'local@host.ru', 'd8578edf8458ce06fbc5bb76a58c5ca4'),
(10, 'admin', 'nislupko@gmail.ru', '21232f297a57a5a743894a0e4a801fc3'),
(21, 'Andrey', 'mail@gmail.com', '48474f975022f960bc2afbe49be581e8');

-- --------------------------------------------------------

--
-- Структура таблицы `work_hour`
--

CREATE TABLE `work_hour` (
  `time` time NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Дамп данных таблицы `work_hour`
--

INSERT INTO `work_hour` (`time`) VALUES
('09:00:00'),
('10:00:00'),
('11:00:00'),
('12:00:00'),
('13:00:00'),
('14:00:00'),
('15:00:00'),
('16:00:00'),
('17:00:00'),
('18:00:00'),
('19:00:00'),
('20:00:00'),
('21:00:00');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `booking`
--
ALTER TABLE `booking`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `time_and_date` (`visitDate`,`visitTime`),
  ADD KEY `user` (`user`);

--
-- Индексы таблицы `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email-index` (`email`);

--
-- Индексы таблицы `work_hour`
--
ALTER TABLE `work_hour`
  ADD PRIMARY KEY (`time`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `booking`
--
ALTER TABLE `booking`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT для таблицы `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=114;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `booking`
--
ALTER TABLE `booking`
  ADD CONSTRAINT `booking_ibfk_1` FOREIGN KEY (`user`) REFERENCES `user` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
