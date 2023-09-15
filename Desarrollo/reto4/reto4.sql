-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-09-2023 a las 22:42:27
-- Versión del servidor: 10.4.27-MariaDB
-- Versión de PHP: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reto4`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `idCategoria` int(11) NOT NULL,
  `nombreCategoria` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`idCategoria`, `nombreCategoria`) VALUES
(1, 'Animales'),
(2, 'Ciudades'),
(3, 'Paises'),
(4, 'Frutas'),
(5, 'Colores');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `palabras`
--

CREATE TABLE `palabras` (
  `idPalabra` int(11) NOT NULL,
  `palabra` varchar(100) DEFAULT NULL,
  `idCategoria` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `palabras`
--

INSERT INTO `palabras` (`idPalabra`, `palabra`, `idCategoria`) VALUES
(1, 'caballo', 1),
(2, 'leon', 1),
(3, 'tigre', 1),
(4, 'gato', 1),
(5, 'perro', 1),
(6, 'foca', 1),
(7, 'avestruz', 1),
(8, 'gallinazo', 1),
(9, 'cocodrilo', 1),
(10, 'gallo', 1),
(11, 'berlin', 2),
(12, 'bangkok', 2),
(13, 'seul', 2),
(14, 'paris', 2),
(15, 'moscu', 2),
(16, 'milan', 2),
(17, 'lisboa', 2),
(18, 'medellin', 2),
(19, 'londres', 2),
(20, 'atenas', 2),
(21, 'turquia', 3),
(22, 'grecia', 3),
(23, 'kenia', 3),
(24, 'protugal', 3),
(25, 'uruguay', 3),
(26, 'tailandia', 3),
(27, 'marruecos', 3),
(28, 'islandia', 3),
(29, 'canada', 3),
(30, 'pakistan', 3),
(31, 'banano', 4),
(32, 'sandia', 4),
(33, 'cereza', 4),
(34, 'perro', 4),
(35, 'manzana', 4),
(36, 'pera', 4),
(37, 'guanabana', 4),
(38, 'lulo', 4),
(39, 'fresa', 4),
(40, 'guayaba', 4),
(41, 'negro', 5),
(42, 'azul', 5),
(43, 'verde', 5),
(44, 'rosado', 5),
(45, 'naranja', 5),
(46, 'marron', 5),
(47, 'gris', 5),
(48, 'amarillo', 5),
(49, 'morado', 5),
(50, 'rojo', 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `puntajes`
--

CREATE TABLE `puntajes` (
  `idPuntaje` int(11) NOT NULL,
  `idUsuario` int(11) DEFAULT NULL,
  `juego` varchar(100) DEFAULT NULL,
  `puntaje` int(11) DEFAULT NULL,
  `intentos` int(11) DEFAULT NULL,
  `fecha` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `puntajes`
--

INSERT INTO `puntajes` (`idPuntaje`, `idUsuario`, `juego`, `puntaje`, `intentos`, `fecha`) VALUES
(59, 5, 'PiedraPapelTijera', 1, 10, '2023-9-14 18:17:40'),
(60, 5, 'PiedraPapelTijera', -6, 11, '2023-9-14 18:19:25'),
(61, 8, 'PiedraPapelTijera', 2, 13, '2023-9-14 18:20:41'),
(62, 8, 'Ahorcado', 5, 1, '2023-9-14 18:21:16'),
(63, 8, 'PiedraPapelTijera', 2, 4, '2023-9-14 18:28:12'),
(64, 9, 'PiedraPapelTijera', 3, 9, '2023-9-15 14:16:20'),
(65, 9, 'Ahorcado', 5, 1, '2023-9-15 14:17:34'),
(66, 9, 'Ahorcado', 6, 0, '2023-9-15 14:17:59'),
(67, 8, 'Ahorcado', 6, 0, '2023-9-15 14:18:40'),
(68, 10, 'PiedraPapelTijera', -2, 17, '2023-9-15 14:30:10'),
(69, 9, 'PiedraPapelTijera', -4, 13, '2023-9-15 14:31:27'),
(70, 9, 'Ahorcado', 6, 0, '2023-9-15 14:32:18'),
(71, 9, 'Ahorcado', 0, 6, '2023-9-15 14:32:46'),
(72, 9, 'PiedraPapelTijera', 1, 4, '2023-9-15 14:38:36'),
(73, 9, 'PiedraPapelTijera', 1, 2, '2023-9-15 14:38:53');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `nombreUsuario` varchar(255) DEFAULT NULL,
  `correoUsuario` varchar(255) DEFAULT NULL,
  `contrasenaUsuario` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `nombreUsuario`, `correoUsuario`, `contrasenaUsuario`) VALUES
(5, 'miltrus090', 'miltru@g.com', 'milton123'),
(6, 'friedman123', 'friedman@gmail.com', '12345'),
(7, 'juan', 'juan@g.com', 'juan123'),
(8, 'ramon', 'ramon@g.com', 'ramon123'),
(9, 'juan123', 'juan@gmail.com', 'juan123'),
(10, 'carlos123', 'carlos@gmail.com', 'carlos123');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`idCategoria`);

--
-- Indices de la tabla `palabras`
--
ALTER TABLE `palabras`
  ADD PRIMARY KEY (`idPalabra`),
  ADD KEY `idCategoria` (`idCategoria`);

--
-- Indices de la tabla `puntajes`
--
ALTER TABLE `puntajes`
  ADD PRIMARY KEY (`idPuntaje`),
  ADD KEY `idUsuario` (`idUsuario`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`),
  ADD UNIQUE KEY `correoUsuario` (`correoUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `idCategoria` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `palabras`
--
ALTER TABLE `palabras`
  MODIFY `idPalabra` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=51;

--
-- AUTO_INCREMENT de la tabla `puntajes`
--
ALTER TABLE `puntajes`
  MODIFY `idPuntaje` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `palabras`
--
ALTER TABLE `palabras`
  ADD CONSTRAINT `palabras_ibfk_1` FOREIGN KEY (`idCategoria`) REFERENCES `categorias` (`idCategoria`);

--
-- Filtros para la tabla `puntajes`
--
ALTER TABLE `puntajes`
  ADD CONSTRAINT `puntajes_ibfk_1` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`idUsuario`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
