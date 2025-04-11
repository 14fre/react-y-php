-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 11-04-2025 a las 19:03:41
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.1.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `galeria_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `imagenes`
--

CREATE TABLE `imagenes` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `imagen` text DEFAULT NULL,
  `fecha` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `imagenes`
--

INSERT INTO `imagenes` (`id`, `nombre`, `descripcion`, `imagen`, `fecha`) VALUES
(13, 'dvsvsd', 'dssd', 'https://2.bp.blogspot.com/-_VS7i7Jnp-s/UcBdeNBKCqI/AAAAAAAB0W0/n6AlrQeZdwg/s1600/Amanecer-en-Alaska.jpg', '2025-04-09 00:16:02'),
(15, 'tigre', 'fuerte y salvaje', 'https://th.bing.com/th/id/OIP.mlYOLgAj1t5YMqXYrmehBwHaEK?rs=1&pid=ImgDetMain', '2025-04-09 00:28:35'),
(21, 'Mujer', 'JAJJAjjJASC', 'https://i.pinimg.com/originals/67/85/0b/67850b16dec7ca4bed70555e18b68220.jpg', '2025-04-10 06:02:26'),
(23, 'Orquidia', 'margaritasssass', 'https://wallpapers.com/images/hd/pink-chrysanthemums-3840-x-2160-wallpaper-im92c59zb26zwbz7.jpg', '2025-04-10 18:57:23'),
(25, 'PAISAJE', 'sfsssfs', 'https://th.bing.com/th/id/OIP.2TSR7xXjDBRr7jSaLAjYfQHaFj?rs=1&pid=ImgDetMain', '2025-04-11 00:32:56');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `imagenes`
--
ALTER TABLE `imagenes`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
