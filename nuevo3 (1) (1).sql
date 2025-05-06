-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 04-05-2025 a las 18:37:39
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `nuevo3`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `id_area` bigint(20) NOT NULL,
  `id_olimpiada` bigint(20) NOT NULL,
  `nombre_area` varchar(100) NOT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `gradoIniAr` varchar(50) NOT NULL,
  `gradoFinAr` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`id_area`, `id_olimpiada`, `nombre_area`, `descripcion`, `gradoIniAr`, `gradoFinAr`, `created_at`, `updated_at`) VALUES
(1, 1, 'Matemáticas', 'Área dedicada a la resolución de problemas matemáticos', '1ro', '5to', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(2, 2, 'Física', 'Área de resolución de problemas físicos', '1ro', '5to', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(3, 1, 'Matemáticas Avanzadas', 'Área para competencias universitarias', '1ro', '5to', '2025-05-01 09:11:14', '2025-05-01 09:11:14'),
(4, 1, 'Matemáticas facilito', 'Área para competencias universitarias', '1ro', '5to', '2025-05-01 09:15:42', '2025-05-01 09:15:42'),
(5, 1, 'Matemáticas teorica', 'Área para competencias universitarias', '1ro', '5to', '2025-05-01 10:59:02', '2025-05-01 10:59:02'),
(6, 1, 'area de sustos', 'bonito', '1ro primaria', '6to primaria', '2025-05-01 11:19:13', '2025-05-01 11:19:13'),
(7, 2, 'area de gogogogo', 'cvxvxcvxcv', 'zxczxczxcz', 'zxczxczxc', '2025-05-01 12:24:50', '2025-05-01 12:24:50'),
(8, 7, 'pepe', 'pepa', '2do secundaria', '6to secundaria', '2025-05-02 03:00:40', '2025-05-02 03:00:40'),
(9, 1, 'lola', 'asdsad', '2do primaria', '4to primaria', '2025-05-02 17:43:13', '2025-05-02 17:43:13'),
(10, 1, 'area de biologia', 'bueno', '2do primaria', '4to primaria', '2025-05-04 05:03:57', '2025-05-04 05:03:57'),
(11, 1, 'lolaklklkklk', 'asdsad', '2do primaria', '4to primaria', '2025-05-04 05:05:21', '2025-05-04 05:05:21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boleta_pagos`
--

CREATE TABLE `boleta_pagos` (
  `id_boleta` bigint(20) NOT NULL,
  `id_inscripcion` bigint(20) NOT NULL,
  `numero_boleta` varchar(50) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fecha_generacion` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `boleta_pagos`
--

INSERT INTO `boleta_pagos` (`id_boleta`, `id_inscripcion`, `numero_boleta`, `monto`, `fecha_generacion`, `created_at`, `updated_at`) VALUES
(1, 1, 'BOLETA001', 100.00, '2025-04-02', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(2, 2, 'BOL-0I2Kz3ey-2', 120.00, '2025-04-27', '2025-04-28 00:36:54', '2025-04-28 00:36:54'),
(3, 3, 'BOL-Oio193GO-3', 120.00, '2025-04-27', '2025-04-28 01:31:33', '2025-04-28 01:31:33'),
(4, 4, 'BOL-uI6TDKCX-4', 50.00, '2025-04-28', '2025-04-28 08:09:46', '2025-04-28 08:09:46'),
(5, 5, 'BOL-F7VKpE9S-5', 50.00, '2025-04-28', '2025-04-28 08:18:38', '2025-04-28 08:18:38'),
(6, 6, 'BOL-veFUPm5P-6', 120.00, '2025-04-28', '2025-04-28 08:24:48', '2025-04-28 08:24:48'),
(7, 7, 'BOL-kmMAT3TP-7', 50.00, '2025-04-28', '2025-04-28 08:32:15', '2025-04-28 08:32:15'),
(8, 8, 'BOL-BV1pXRTj-8', 50.00, '2025-04-28', '2025-04-28 08:38:22', '2025-04-28 08:38:22'),
(9, 9, 'BOL-u3bryGyL-9', 0.00, '2025-04-28', '2025-04-28 10:09:55', '2025-04-28 10:09:55'),
(10, 10, 'BOL-7AImCYFb-10', 50.00, '2025-04-28', '2025-04-28 20:41:26', '2025-04-28 20:41:26'),
(11, 11, 'BOL-0vcsU8kS-11', 50.00, '2025-04-28', '2025-04-28 21:48:28', '2025-04-28 21:48:28'),
(12, 12, 'BOL-DtSxFDqT-12', 70.00, '2025-04-28', '2025-04-28 21:57:07', '2025-04-28 21:57:07'),
(13, 13, 'BOL-Sj3PumF2-13', 350.50, '2025-05-02', '2025-05-03 00:44:55', '2025-05-03 00:44:55'),
(14, 14, 'BOL-rdw5nMD0-14', 12.00, '2025-05-03', '2025-05-03 19:20:19', '2025-05-03 19:20:19'),
(15, 15, 'BOL-bJ7KeTo1-15', 150.50, '2025-05-03', '2025-05-04 01:45:03', '2025-05-04 01:45:03'),
(16, 16, 'BOL-UQCQYLQA-16', 50.00, '2025-05-03', '2025-05-04 01:47:17', '2025-05-04 01:47:17'),
(17, 17, 'BOL-nbuEpY3X-17', 70.00, '2025-05-03', '2025-05-04 01:53:58', '2025-05-04 01:53:58'),
(18, 18, 'BOL-bMMy1ppA-18', 70.00, '2025-05-03', '2025-05-04 02:26:15', '2025-05-04 02:26:15'),
(19, 21, 'BOL-DdRSfFw2-21', 70.00, '2025-05-04', '2025-05-04 08:06:55', '2025-05-04 08:06:55'),
(20, 22, 'BOL-xRTqBbuE-22', 50.00, '2025-05-04', '2025-05-04 09:00:38', '2025-05-04 09:00:38'),
(21, 26, 'BOL-Fxp9jlgE-26', 50.00, '2025-05-04', '2025-05-04 09:26:48', '2025-05-04 09:26:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comprobante_pagos`
--

CREATE TABLE `comprobante_pagos` (
  `id_comprobante` bigint(20) NOT NULL,
  `id_boleta` bigint(20) NOT NULL,
  `archivo_comprobante` varchar(255) NOT NULL,
  `numero_comprobante` varchar(50) DEFAULT NULL,
  `nombre_pagador` varchar(100) DEFAULT NULL,
  `estado_verificacion` enum('Pendiente','Verificado','Rechazado') NOT NULL,
  `fecha_subida` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comprobante_pagos`
--

INSERT INTO `comprobante_pagos` (`id_comprobante`, `id_boleta`, `archivo_comprobante`, `numero_comprobante`, `nombre_pagador`, `estado_verificacion`, `fecha_subida`, `created_at`, `updated_at`) VALUES
(1, 1, 'comprobante1.pdf', 'COMPROBANTE001', 'Juan Pérez', 'Pendiente', '2025-04-02', '2025-04-27 20:11:32', '2025-04-27 20:11:32');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso`
--

CREATE TABLE `curso` (
  `id_curso` bigint(20) NOT NULL,
  `nameCurso` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`id_curso`, `nameCurso`) VALUES
(13, '1ro primaria'),
(14, '2do primaria'),
(15, '3ro primaria'),
(16, '4to primaria'),
(17, '5to primaria'),
(18, '6to primaria'),
(19, '1ro secundaria'),
(20, '2do secundaria'),
(21, '3ro secundaria'),
(22, '4to secundaria'),
(23, '5to secundaria'),
(24, '6to secundaria');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_area`
--

CREATE TABLE `curso_area` (
  `id_curso_area` bigint(20) NOT NULL,
  `id_curso` bigint(20) NOT NULL,
  `id_area` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso_area`
--

INSERT INTO `curso_area` (`id_curso_area`, `id_curso`, `id_area`) VALUES
(1, 13, 3),
(2, 14, 3),
(3, 15, 3),
(4, 13, 4),
(5, 14, 4),
(6, 15, 4),
(7, 13, 5),
(8, 14, 5),
(9, 15, 5),
(10, 13, 6),
(11, 14, 6),
(12, 16, 6),
(13, 15, 6),
(14, 18, 6),
(15, 17, 6),
(16, 24, 7),
(17, 23, 7),
(18, 22, 7),
(19, 21, 7),
(20, 22, 8),
(21, 23, 8),
(22, 21, 8),
(23, 20, 8),
(24, 24, 8),
(25, 14, 9),
(26, 22, 9),
(27, 15, 9),
(28, 16, 10),
(29, 17, 10),
(30, 23, 10),
(31, 22, 10),
(32, 15, 10),
(33, 18, 11),
(34, 17, 11),
(35, 16, 11);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_nivel`
--

CREATE TABLE `curso_nivel` (
  `id_curso_nivel` bigint(20) NOT NULL,
  `id_curso` bigint(20) NOT NULL,
  `id_nivel` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcions`
--

CREATE TABLE `inscripcions` (
  `id_inscripcion` bigint(20) NOT NULL,
  `estado` enum('Pendiente','Pagado','Verificado') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inscripcions`
--

INSERT INTO `inscripcions` (`id_inscripcion`, `estado`, `created_at`, `updated_at`) VALUES
(1, 'Pendiente', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(2, 'Pendiente', '2025-04-28 00:36:54', '2025-04-28 00:36:54'),
(3, 'Pendiente', '2025-04-28 01:31:33', '2025-04-28 01:31:33'),
(4, 'Pendiente', '2025-04-28 08:09:46', '2025-04-28 08:09:46'),
(5, 'Pendiente', '2025-04-28 08:18:38', '2025-04-28 08:18:38'),
(6, 'Pendiente', '2025-04-28 08:24:48', '2025-04-28 08:24:48'),
(7, 'Pendiente', '2025-04-28 08:32:15', '2025-04-28 08:32:15'),
(8, 'Pendiente', '2025-04-28 08:38:22', '2025-04-28 08:38:22'),
(9, 'Pendiente', '2025-04-28 10:09:55', '2025-04-28 10:09:55'),
(10, 'Pendiente', '2025-04-28 20:41:25', '2025-04-28 20:41:25'),
(11, 'Pendiente', '2025-04-28 21:48:28', '2025-04-28 21:48:28'),
(12, 'Pendiente', '2025-04-28 21:57:07', '2025-04-28 21:57:07'),
(13, 'Pendiente', '2025-05-03 00:44:55', '2025-05-03 00:44:55'),
(14, 'Pendiente', '2025-05-03 19:20:18', '2025-05-03 19:20:18'),
(15, 'Pendiente', '2025-05-04 01:45:03', '2025-05-04 01:45:03'),
(16, 'Pendiente', '2025-05-04 01:47:16', '2025-05-04 01:47:16'),
(17, 'Pendiente', '2025-05-04 01:53:58', '2025-05-04 01:53:58'),
(18, 'Pendiente', '2025-05-04 02:26:15', '2025-05-04 02:26:15'),
(21, 'Pendiente', '2025-05-04 08:06:55', '2025-05-04 08:06:55'),
(22, 'Pendiente', '2025-05-04 09:00:38', '2025-05-04 09:00:38'),
(26, 'Pendiente', '2025-05-04 09:26:48', '2025-05-04 09:26:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcion_area_nivel`
--

CREATE TABLE `inscripcion_area_nivel` (
  `id` bigint(20) NOT NULL,
  `id_inscripcion` bigint(20) NOT NULL,
  `id_area` bigint(20) NOT NULL,
  `id_nivel` bigint(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inscripcion_area_nivel`
--

INSERT INTO `inscripcion_area_nivel` (`id`, `id_inscripcion`, `id_area`, `id_nivel`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2025-04-27 20:11:33', '2025-04-27 20:11:33'),
(2, 1, 2, 2, '2025-04-27 20:11:33', '2025-04-27 20:11:33'),
(3, 2, 1, 1, '2025-04-28 00:36:54', '2025-04-28 00:36:54'),
(4, 2, 2, 2, '2025-04-28 00:36:54', '2025-04-28 00:36:54'),
(5, 3, 1, 1, '2025-04-28 01:31:33', '2025-04-28 01:31:33'),
(6, 3, 2, 2, '2025-04-28 01:31:33', '2025-04-28 01:31:33'),
(7, 4, 1, 1, '2025-04-28 08:09:46', '2025-04-28 08:09:46'),
(8, 5, 1, 1, '2025-04-28 08:18:38', '2025-04-28 08:18:38'),
(9, 6, 1, 1, '2025-04-28 08:24:48', '2025-04-28 08:24:48'),
(10, 6, 2, 2, '2025-04-28 08:24:48', '2025-04-28 08:24:48'),
(11, 7, 1, 1, '2025-04-28 08:32:15', '2025-04-28 08:32:15'),
(12, 8, 1, 1, '2025-04-28 08:38:22', '2025-04-28 08:38:22'),
(13, 10, 2, 1, '2025-04-28 20:41:25', '2025-04-28 20:41:25'),
(14, 11, 1, 3, '2025-04-28 21:48:28', '2025-04-28 21:48:28'),
(15, 12, 1, 4, '2025-04-28 21:57:07', '2025-04-28 21:57:07'),
(16, 13, 1, 11, '2025-05-03 00:44:55', '2025-05-03 00:44:55'),
(17, 13, 1, 12, '2025-05-03 00:44:55', '2025-05-03 00:44:55'),
(18, 14, 6, 15, '2025-05-03 19:20:19', '2025-05-03 19:20:19'),
(19, 15, 1, 13, '2025-05-04 01:45:03', '2025-05-04 01:45:03'),
(20, 16, 2, 1, '2025-05-04 01:47:17', '2025-05-04 01:47:17'),
(21, 17, 2, 2, '2025-05-04 01:53:58', '2025-05-04 01:53:58'),
(22, 18, 2, 2, '2025-05-04 02:26:15', '2025-05-04 02:26:15'),
(23, 21, 2, 2, '2025-05-04 08:06:55', '2025-05-04 08:06:55'),
(24, 22, 2, 1, '2025-05-04 09:00:38', '2025-05-04 09:00:38'),
(25, 26, 2, 1, '2025-05-04 09:26:48', '2025-05-04 09:26:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(10) UNSIGNED DEFAULT NULL,
  `created_at` int(10) UNSIGNED NOT NULL,
  `finished_at` int(10) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(11) NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel_categorias`
--

CREATE TABLE `nivel_categorias` (
  `id_nivel` bigint(20) NOT NULL,
  `id_area` bigint(20) NOT NULL,
  `nombre_nivel` varchar(100) NOT NULL,
  `descripcion` text DEFAULT NULL,
  `fecha_examen` date DEFAULT NULL,
  `costo` decimal(10,2) NOT NULL,
  `habilitacion` tinyint(1) DEFAULT NULL,
  `gradoIniCat` varchar(50) NOT NULL,
  `gradoFinCat` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `nivel_categorias`
--

INSERT INTO `nivel_categorias` (`id_nivel`, `id_area`, `nombre_nivel`, `descripcion`, `fecha_examen`, `costo`, `habilitacion`, `gradoIniCat`, `gradoFinCat`, `created_at`, `updated_at`) VALUES
(1, 2, 'Nivel Básico', 'Nivel para estudiantes de primaria', '2025-06-02', 50.00, 1, '1ro', '3ro', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(2, 2, 'Nivel Avanzado', 'Nivel para estudiantes de secundaria', '2025-06-03', 70.00, 1, '4to', '5to', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(3, 1, 'Nivel Básico', 'Descripción del nivel básico', '2025-06-10', 50.00, 1, '1° Primaria', '3° Primaria', '2025-04-28 14:35:18', '2025-04-28 14:35:18'),
(4, 1, 'Nivel Intermedio', 'Descripción del nivel intermedio', '2025-06-15', 70.00, 1, '4° Primaria', '6° Primaria', '2025-04-28 14:35:18', '2025-04-28 14:35:18'),
(5, 2, 'Nivel Avanzado', 'Descripción del nivel avanzado', '2025-06-20', 90.00, 1, '1° Secundaria', '3° Secundaria', '2025-04-28 14:35:18', '2025-04-28 14:35:18'),
(6, 2, 'Nivel Superior', 'Descripción del nivel superior', '2025-06-25', 120.00, 1, '4° Secundaria', '6° Secundaria', '2025-04-28 14:35:18', '2025-04-28 14:35:18'),
(7, 1, 'Nivel Olimpiadas', 'Nivel especial para olimpiadas', '2025-07-01', 150.00, 1, '1° Secundaria', 'Universidad', '2025-04-28 14:35:18', '2025-04-28 14:35:18'),
(8, 5, 'Básico', 'Nivel inicial para principiantes', '2024-06-01', 30.50, 1, '1ro', '3ro', '2025-05-02 01:47:20', '2025-05-02 01:47:20'),
(9, 5, 'Intermedio', 'Para participantes con experiencia básica', '2024-06-15', 45.00, 1, '4to', '6to', '2025-05-02 01:47:20', '2025-05-02 01:47:20'),
(10, 1, 'nive para deviles', 'asdadasdsa', '2025-05-24', 15.00, 1, '1', '2', '2025-05-02 02:44:51', '2025-05-02 02:44:51'),
(11, 1, 'Nivel Básico', 'Nivel inicial para principiantes', '2024-05-15', 150.50, 1, 'A', 'C', '2025-05-02 16:33:02', '2025-05-02 16:33:02'),
(12, 1, 'Nivel Intermedio', NULL, '2024-06-01', 200.00, 0, 'D', 'F', '2025-05-02 16:33:02', '2025-05-02 16:33:02'),
(13, 1, 'Nivel Básico', 'Nivel inicial para principiantes', '2024-05-15', 150.50, 1, 'A', 'C', '2025-05-02 18:04:12', '2025-05-02 18:04:12'),
(14, 1, 'asdadasdas', 'sadasdas', '2025-05-16', 15.00, 1, 'a', 'a', '2025-05-02 18:46:53', '2025-05-02 18:46:53'),
(15, 6, 'ggggggggggggggg', 'sadasdasd', '2025-05-19', 12.00, 0, '1', '2', '2025-05-02 18:48:18', '2025-05-02 18:48:18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `olimpiadas`
--

CREATE TABLE `olimpiadas` (
  `id_olimpiada` bigint(20) NOT NULL,
  `nombre_olimpiada` varchar(100) NOT NULL,
  `descripcion_olimpiada` varchar(150) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `fecha_final` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `olimpiadas`
--

INSERT INTO `olimpiadas` (`id_olimpiada`, `nombre_olimpiada`, `descripcion_olimpiada`, `fecha_inicio`, `fecha_final`, `created_at`, `updated_at`) VALUES
(1, 'Olimpiada Nacional', 'Competencia anual de ciencias y matemáticas', '2025-06-01', '2025-06-15', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(2, 'Primera Olimpiada Nacional de Matemáticas 2023', 'Competencia nacional anual para estudiantes de secundaria en matemáticas avanzadas', '2023-05-15', '2023-05-18', '2025-04-29 01:20:34', '2025-04-29 01:20:34'),
(7, 'gogogogog', 'zzzzzzzzzzzzzzzzzzzzxxxxxxxxxxxxx', '2025-05-01', '2025-05-15', '2025-05-01 12:39:22', '2025-05-01 12:39:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `olimpistas`
--

CREATE TABLE `olimpistas` (
  `id_olimpista` bigint(20) NOT NULL,
  `id_inscripcion` bigint(20) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `ci` varchar(20) NOT NULL,
  `fecha_nacimiento` date NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `colegio` varchar(100) NOT NULL,
  `departamento` varchar(50) NOT NULL,
  `provincia` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `olimpistas`
--

INSERT INTO `olimpistas` (`id_olimpista`, `id_inscripcion`, `nombres`, `apellidos`, `ci`, `fecha_nacimiento`, `correo`, `telefono`, `colegio`, `departamento`, `provincia`, `created_at`, `updated_at`) VALUES
(1, 1, 'Juan', 'Pérez', '12345678', '2005-05-10', 'juan.perez@correo.com', '555-1234', 'Colegio A', 'Departamento 1', 'Provincia 1', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(2, 2, 'Carlos', 'Mamani', '10203040', '2011-08-20', 'carlos.m@ejemplo.com', '70101010', 'Unidad Educativa Central', 'Cochabamba', 'Cercado', '2025-04-28 00:36:54', '2025-04-28 00:36:54'),
(3, 2, 'Sofia', 'Flores', '20304050', '2009-03-01', 'sofia.f@ejemplo.com', '60202020', 'Colegio Bicentenario', 'Santa Cruz', 'Warnes', '2025-04-28 00:36:54', '2025-04-28 00:36:54'),
(4, 3, 'Carlos', 'Mamani', '10153040', '2011-08-20', 'carlos.m@ejemplo.com', '70101010', 'Unidad Educativa Central', 'Cochabamba', 'Cercado', '2025-04-28 01:31:33', '2025-04-28 01:31:33'),
(5, 3, 'Sofia', 'Flores', '20324050', '2009-03-01', 'sofia.f@ejemplo.com', '60202020', 'Colegio Bicentenario', 'Santa Cruz', 'Warnes', '2025-04-28 01:31:33', '2025-04-28 01:31:33'),
(6, 4, 'asdasdas', 'dasasdasdas', '123123213', '2025-04-10', 'adasdsad@gmail.com', '1321312', 'asdsadas', 'asdasdas', 'asdasdasd', '2025-04-28 08:09:46', '2025-04-28 08:09:46'),
(7, 5, 'pepe', 'pepe', '3333', '2025-04-24', 'pepe@gmail.com', '1321312', 'pepe', 'pepe', 'pepe', '2025-04-28 08:18:38', '2025-04-28 08:18:38'),
(8, 6, 'pepardo', 'matis', '10154240', '2011-08-20', 'carlos.m@ejemplo.com', '704201010', 'Unidad Educativa Central', 'Cochabamba', 'Cercado', '2025-04-28 08:24:48', '2025-04-28 08:24:48'),
(9, 7, 'lala', 'lala', '33331', '2025-04-18', 'lala@gmail.com', '21254', 'pepe', 'pepe', 'pepe', '2025-04-28 08:32:15', '2025-04-28 08:32:15'),
(10, 8, 'ga', 'dasasdasdas', '333322', '2025-04-25', 'adasdsad@gmail.com', '1321312', 'asdsadas', 'pepe', 'pepe', '2025-04-28 08:38:22', '2025-04-28 08:38:22'),
(11, 9, 'jaja', 'jaja', '33222', '2025-04-05', 'jaja@gmail.com', '1321312', 'pepe', 'asdasdas', 'asdasdasd', '2025-04-28 10:09:55', '2025-04-28 10:09:55'),
(12, 10, 'josue', 'mamani calani', '14384311', '2025-04-11', 'josue@gmail.com', '133654', 'america del sur', 'cbba', 'cercado', '2025-04-28 20:41:25', '2025-04-28 20:41:25'),
(13, 11, 'juan', 'gonsales', '143843114', '2025-04-18', 'adasdsad@gmail.com', '13213121', 'asdsadas', 'pepe', 'pepe', '2025-04-28 21:48:28', '2025-04-28 21:48:28'),
(14, 12, 'haha', 'haha', '332224', '2025-04-18', 'adasdsad@gmail.com', '1321312', 'pepe', 'pepe', 'asdasdasd', '2025-04-28 21:57:07', '2025-04-28 21:57:07'),
(15, 13, 'asdasdas', 'dasasdasdas', '3333221', '2025-05-22', 'adasdsad@gmail.com', '13213121', 'asdsadas', 'pepe', 'asdasdasd', '2025-05-03 00:44:55', '2025-05-03 00:44:55'),
(16, 14, 'bababa', 'bababaab', '3333222', '2025-05-12', 'adasdssad@gmail.com', '1321312', 'asdsadas', 'pepe', 'asdasdasd', '2025-05-03 19:20:19', '2025-05-03 19:20:19'),
(17, 15, 'asdasdas', 'haha', '33330141', '2003-03-06', 'adsad@gmail.com', '13213121', 'asdsadas', 'pepe', 'asdasdasd', '2025-05-04 01:45:03', '2025-05-04 01:45:03'),
(18, 16, 'asdasdas', 'dasasdasdas', '3333048961', '2025-05-21', 'gaa@gmail.com', '1321312', 'asdsadas', 'pepe', 'asdasdasd', '2025-05-04 01:47:17', '2025-05-04 01:47:17'),
(19, 17, 'ELPEPARDO', 'haha', '33330145', '2025-06-02', 'adasdsad@gmail.com', '13213121', 'asdsadas', 'cbba', 'cercado', '2025-05-04 01:53:58', '2025-05-04 01:53:58'),
(20, 18, 'HAAAAAA', 'haha', '3333220202', '2025-05-08', 'adasdsad@gmail.com', '1321312', 'asdsadas', 'pepe', 'asdasdasd', '2025-05-04 02:26:15', '2025-05-04 02:26:15'),
(21, 1, 'Carlos', 'Ramirez', '987654321', '2004-02-15', 'carlos.ramirez@example.com', '789456123', 'Colegio Central', 'La Paz', 'Murillo', '2025-05-04 07:17:52', '2025-05-04 07:17:52'),
(24, 21, 'pepardoas', 'matissa', '1015424032', '2011-08-15', 'caraslos.m@ejemplo.com', '7042001010', 'Unidad Educativa Cesntral', 'Cochabambaba', 'Cercadod', '2025-05-04 08:06:55', '2025-05-04 08:06:55'),
(25, 22, 'naruto', 'uchija', '333322210', '2025-05-09', 'adasdasdsad@gmail.com', '1321312', 'asdsadas', 'asdasdas', 'asdasdasd', '2025-05-04 09:00:38', '2025-05-04 09:00:38'),
(29, 26, 'mbnmbnm', 'bnmbnmnb', '66699901', '2025-05-17', 'lafala@gmail.com', '1321312120', 'asdsadas', 'asdasdas', 'asdasdasd', '2025-05-04 09:26:48', '2025-05-04 09:26:48');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutors`
--

CREATE TABLE `tutors` (
  `id_tutor` bigint(20) NOT NULL,
  `id_inscripcion` bigint(20) NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `ci` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `contacto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tutors`
--

INSERT INTO `tutors` (`id_tutor`, `id_inscripcion`, `nombres`, `apellidos`, `ci`, `correo`, `telefono`, `created_at`, `updated_at`, `contacto`) VALUES
(1, 1, 'Ana', 'Gómez', '87654321', 'ana.gomez@correo.com', '555-5678', '2025-04-27 20:11:32', '2025-04-27 20:11:32', 'mama'),
(2, 2, 'Roberto', 'Quispe', '30405060', 'roberto.q@ejemplo.com', '77513030', '2025-04-28 00:36:54', '2025-04-28 00:36:54', 'profeson'),
(3, 2, 'pepe', 'gonsales', '3035060', 'robe5rto.q@ejemplo.com', '73603030', '2025-04-28 00:36:54', '2025-04-28 00:36:54', 'papa'),
(4, 3, 'Roberto', 'Quispe', '3042460', 'roberto.q@ejemplo.com', '77513030', '2025-04-28 01:31:33', '2025-04-28 01:31:33', NULL),
(5, 3, 'pepe', 'gonsales', '3033460', 'robe5rto.q@ejemplo.com', '73603030', '2025-04-28 01:31:33', '2025-04-28 01:31:33', 'profeson'),
(6, 4, 'fdfsfds', 'fsdfsdfsd', '12312312', 'asdasd@gmail.com', '12341231', '2025-04-28 08:09:46', '2025-04-28 08:09:46', 'papa'),
(7, 5, 'pepepepe', 'pepepepe', '6351', 'pepepepe@gmail.com', '554742', '2025-04-28 08:18:38', '2025-04-28 08:18:38', 'mama'),
(8, 6, 'Roberto', 'Quispe', '3024460', 'roberto.q@ejemplo.com', '77513030', '2025-04-28 08:24:48', '2025-04-28 08:24:48', 'papa'),
(9, 6, 'pepe', 'gonsales', '3553460', 'robe5rto.q@ejemplo.com', '73603030', '2025-04-28 08:24:48', '2025-04-28 08:24:48', 'profeson'),
(10, 7, 'lalalala', 'lalalala', '214', 'lala@gmail.com', '8525', '2025-04-28 08:32:15', '2025-04-28 08:32:15', 'mama'),
(11, 8, 'fdfsfds', 'fsdfsdfsd', '21421', 'asdasd@gmail.com', '123412312', '2025-04-28 08:38:22', '2025-04-28 08:38:22', 'papa'),
(12, 9, 'jajajaja', 'jajajaja', '63512', 'jajajaja@gmail.com', '1231', '2025-04-28 10:09:55', '2025-04-28 10:09:55', 'papa'),
(13, 10, 'judit', 'gongora', '356971', 'judit@gmail.com', '36421562', '2025-04-28 20:41:25', '2025-04-28 20:41:25', 'papa'),
(14, 11, 'pepepepe', 'pepepepe', '63518', 'lala@gmail.com', '554742', '2025-04-28 21:48:28', '2025-04-28 21:48:28', 'profeson'),
(15, 12, 'lalalala', 'pepepepe', '123123122', 'hahahaha@gmail.com', '1231', '2025-04-28 21:57:07', '2025-04-28 21:57:07', 'papa'),
(16, 13, 'fdfsfds', 'lalalala', '635122', 'ldala@gmail.com', '364215623', '2025-05-03 00:44:55', '2025-05-03 00:44:55', 'mama'),
(17, 14, 'pepepepe', 'fsdfsdfsd', '63515', 'lalsa@gmail.com', '36421562', '2025-05-03 19:20:19', '2025-05-03 19:20:19', 'papa'),
(18, 15, 'lalalala', 'fsdfsdfsd', '21421411', 'ada@gmail.com', '8525212', '2025-05-04 01:45:03', '2025-05-04 01:45:03', 'profeson'),
(19, 16, 'fdfsfds', 'fsdfsdfsd', '6351018', 'asdasd@gmail.com', '36421562', '2025-05-04 01:47:17', '2025-05-04 01:47:17', 'papa'),
(20, 17, 'ELPEPARDODO', 'pepepepe', '2140417', 'lalaADA@gmail.com', '8525', '2025-05-04 01:53:58', '2025-05-04 01:53:58', 'papa'),
(21, 18, 'hAAAAAAA', 'fsdfsdfsd', '2141010', 'jajajaja@gmail.com', '12341231', '2025-05-04 02:26:15', '2025-05-04 02:26:15', 'papa'),
(22, 21, 'Robertoasda', 'Quispeasdasd', '30244606546', 'robe634561rto.q@ejemplo.com', '7751103030', '2025-05-04 08:06:55', '2025-05-04 08:06:55', 'mama'),
(23, 21, 'pepeas', 'gonsales', '355346210', 'robfae5rto.q@ejemplo.com', '736032030', '2025-05-04 08:06:55', '2025-05-04 08:06:55', 'mama'),
(24, 22, 'itachi', 'uzumaki', '6351210', 'sdasad@gmail.com', '320120', '2025-05-04 09:00:38', '2025-05-04 09:00:38', 'padre'),
(28, 26, 'pepardoasdasd', 'jajajajaasdasd', '63519969', 'asasdasdd@gmail.com', '85255412', '2025-05-04 09:26:48', '2025-05-04 09:26:48', 'papa/mama');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id_area`),
  ADD UNIQUE KEY `nombre_area` (`nombre_area`),
  ADD KEY `id_olimpiada` (`id_olimpiada`);

--
-- Indices de la tabla `boleta_pagos`
--
ALTER TABLE `boleta_pagos`
  ADD PRIMARY KEY (`id_boleta`),
  ADD UNIQUE KEY `numero_boleta` (`numero_boleta`),
  ADD KEY `id_inscripcion` (`id_inscripcion`);

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `comprobante_pagos`
--
ALTER TABLE `comprobante_pagos`
  ADD PRIMARY KEY (`id_comprobante`),
  ADD KEY `id_boleta` (`id_boleta`);

--
-- Indices de la tabla `curso`
--
ALTER TABLE `curso`
  ADD PRIMARY KEY (`id_curso`);

--
-- Indices de la tabla `curso_area`
--
ALTER TABLE `curso_area`
  ADD PRIMARY KEY (`id_curso_area`),
  ADD KEY `fk_curso_area_curso` (`id_curso`),
  ADD KEY `fk_curso_area_area` (`id_area`);

--
-- Indices de la tabla `curso_nivel`
--
ALTER TABLE `curso_nivel`
  ADD PRIMARY KEY (`id_curso_nivel`),
  ADD UNIQUE KEY `id_curso` (`id_curso`,`id_nivel`),
  ADD KEY `id_nivel` (`id_nivel`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`);

--
-- Indices de la tabla `inscripcions`
--
ALTER TABLE `inscripcions`
  ADD PRIMARY KEY (`id_inscripcion`);

--
-- Indices de la tabla `inscripcion_area_nivel`
--
ALTER TABLE `inscripcion_area_nivel`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `id_inscripcion` (`id_inscripcion`,`id_area`,`id_nivel`),
  ADD KEY `id_area` (`id_area`),
  ADD KEY `id_nivel` (`id_nivel`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `nivel_categorias`
--
ALTER TABLE `nivel_categorias`
  ADD PRIMARY KEY (`id_nivel`),
  ADD KEY `id_area` (`id_area`);

--
-- Indices de la tabla `olimpiadas`
--
ALTER TABLE `olimpiadas`
  ADD PRIMARY KEY (`id_olimpiada`);

--
-- Indices de la tabla `olimpistas`
--
ALTER TABLE `olimpistas`
  ADD PRIMARY KEY (`id_olimpista`),
  ADD UNIQUE KEY `ci` (`ci`),
  ADD KEY `id_inscripcion` (`id_inscripcion`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `token` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `tutors`
--
ALTER TABLE `tutors`
  ADD PRIMARY KEY (`id_tutor`),
  ADD UNIQUE KEY `ci` (`ci`),
  ADD KEY `id_inscripcion` (`id_inscripcion`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `id_area` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `boleta_pagos`
--
ALTER TABLE `boleta_pagos`
  MODIFY `id_boleta` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de la tabla `comprobante_pagos`
--
ALTER TABLE `comprobante_pagos`
  MODIFY `id_comprobante` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `id_curso` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT de la tabla `curso_area`
--
ALTER TABLE `curso_area`
  MODIFY `id_curso_area` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT de la tabla `curso_nivel`
--
ALTER TABLE `curso_nivel`
  MODIFY `id_curso_nivel` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inscripcions`
--
ALTER TABLE `inscripcions`
  MODIFY `id_inscripcion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT de la tabla `inscripcion_area_nivel`
--
ALTER TABLE `inscripcion_area_nivel`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `nivel_categorias`
--
ALTER TABLE `nivel_categorias`
  MODIFY `id_nivel` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `olimpiadas`
--
ALTER TABLE `olimpiadas`
  MODIFY `id_olimpiada` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `olimpistas`
--
ALTER TABLE `olimpistas`
  MODIFY `id_olimpista` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tutors`
--
ALTER TABLE `tutors`
  MODIFY `id_tutor` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `areas`
--
ALTER TABLE `areas`
  ADD CONSTRAINT `areas_ibfk_1` FOREIGN KEY (`id_olimpiada`) REFERENCES `olimpiadas` (`id_olimpiada`);

--
-- Filtros para la tabla `boleta_pagos`
--
ALTER TABLE `boleta_pagos`
  ADD CONSTRAINT `boleta_pagos_ibfk_1` FOREIGN KEY (`id_inscripcion`) REFERENCES `inscripcions` (`id_inscripcion`);

--
-- Filtros para la tabla `comprobante_pagos`
--
ALTER TABLE `comprobante_pagos`
  ADD CONSTRAINT `comprobante_pagos_ibfk_1` FOREIGN KEY (`id_boleta`) REFERENCES `boleta_pagos` (`id_boleta`);

--
-- Filtros para la tabla `curso_area`
--
ALTER TABLE `curso_area`
  ADD CONSTRAINT `fk_curso_area_area` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id_area`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_curso_area_curso` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`) ON DELETE CASCADE;

--
-- Filtros para la tabla `curso_nivel`
--
ALTER TABLE `curso_nivel`
  ADD CONSTRAINT `curso_nivel_ibfk_1` FOREIGN KEY (`id_curso`) REFERENCES `curso` (`id_curso`),
  ADD CONSTRAINT `curso_nivel_ibfk_2` FOREIGN KEY (`id_nivel`) REFERENCES `nivel_categorias` (`id_nivel`);

--
-- Filtros para la tabla `inscripcion_area_nivel`
--
ALTER TABLE `inscripcion_area_nivel`
  ADD CONSTRAINT `inscripcion_area_nivel_ibfk_1` FOREIGN KEY (`id_inscripcion`) REFERENCES `inscripcions` (`id_inscripcion`),
  ADD CONSTRAINT `inscripcion_area_nivel_ibfk_2` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id_area`),
  ADD CONSTRAINT `inscripcion_area_nivel_ibfk_3` FOREIGN KEY (`id_nivel`) REFERENCES `nivel_categorias` (`id_nivel`);

--
-- Filtros para la tabla `nivel_categorias`
--
ALTER TABLE `nivel_categorias`
  ADD CONSTRAINT `nivel_categorias_ibfk_1` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id_area`);

--
-- Filtros para la tabla `olimpistas`
--
ALTER TABLE `olimpistas`
  ADD CONSTRAINT `olimpistas_ibfk_1` FOREIGN KEY (`id_inscripcion`) REFERENCES `inscripcions` (`id_inscripcion`);

--
-- Filtros para la tabla `tutors`
--
ALTER TABLE `tutors`
  ADD CONSTRAINT `tutors_ibfk_1` FOREIGN KEY (`id_inscripcion`) REFERENCES `inscripcions` (`id_inscripcion`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
