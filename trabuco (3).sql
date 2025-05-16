-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-05-2025 a las 23:48:56
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
-- Base de datos: `trabuco`
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
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`id_area`, `id_olimpiada`, `nombre_area`, `descripcion`, `created_at`, `updated_at`) VALUES
(1, 1, 'Matemáticas', 'Área dedicada a la resolución de problemas matemáticos', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(2, 2, 'Física', 'Área de resolución de problemas físicos', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(3, 1, 'Matemáticas Avanzadas', 'Área para competencias universitarias', '2025-05-01 09:11:14', '2025-05-01 09:11:14'),
(4, 1, 'Matemáticas facilito', 'Área para competencias universitarias', '2025-05-01 09:15:42', '2025-05-01 09:15:42'),
(5, 1, 'Matemáticas teorica', 'Área para competencias universitarias', '2025-05-01 10:59:02', '2025-05-01 10:59:02'),
(6, 1, 'area de sustos', 'bonito', '2025-05-01 11:19:13', '2025-05-01 11:19:13'),
(7, 2, 'area de gogogogo', 'cvxvxcvxcv', '2025-05-01 12:24:50', '2025-05-01 12:24:50'),
(8, 7, 'pepe', 'pepa', '2025-05-02 03:00:40', '2025-05-02 03:00:40'),
(9, 1, 'lola', 'asdsad', '2025-05-02 17:43:13', '2025-05-02 17:43:13'),
(10, 1, 'area de biologia', 'bueno', '2025-05-04 05:03:57', '2025-05-04 05:03:57'),
(11, 1, 'lolaklklkklk', 'asdsad', '2025-05-04 05:05:21', '2025-05-04 05:05:21');

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
  `updated_at` timestamp NULL DEFAULT NULL,
  `id_olimpista` bigint(20) DEFAULT NULL,
  `id_tutor` bigint(20) DEFAULT NULL,
  `areas_niveles` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`areas_niveles`)),
  `nombre_olimpiada` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `boleta_pagos`
--

INSERT INTO `boleta_pagos` (`id_boleta`, `id_inscripcion`, `numero_boleta`, `monto`, `fecha_generacion`, `created_at`, `updated_at`, `id_olimpista`, `id_tutor`, `areas_niveles`, `nombre_olimpiada`) VALUES
(1, 1, 'BOLETA001', 100.00, '2025-04-02', '2025-04-27 20:11:32', '2025-04-27 20:11:32', NULL, NULL, NULL, NULL),
(2, 2, 'BOL-0I2Kz3ey-2', 120.00, '2025-04-27', '2025-04-28 00:36:54', '2025-04-28 00:36:54', NULL, NULL, NULL, NULL),
(3, 3, 'BOL-Oio193GO-3', 120.00, '2025-04-27', '2025-04-28 01:31:33', '2025-04-28 01:31:33', NULL, NULL, NULL, NULL),
(4, 4, 'BOL-uI6TDKCX-4', 50.00, '2025-04-28', '2025-04-28 08:09:46', '2025-04-28 08:09:46', NULL, NULL, NULL, NULL),
(5, 5, 'BOL-F7VKpE9S-5', 50.00, '2025-04-28', '2025-04-28 08:18:38', '2025-04-28 08:18:38', NULL, NULL, NULL, NULL),
(6, 6, 'BOL-veFUPm5P-6', 120.00, '2025-04-28', '2025-04-28 08:24:48', '2025-04-28 08:24:48', NULL, NULL, NULL, NULL),
(7, 7, 'BOL-kmMAT3TP-7', 50.00, '2025-04-28', '2025-04-28 08:32:15', '2025-04-28 08:32:15', NULL, NULL, NULL, NULL),
(8, 8, 'BOL-BV1pXRTj-8', 50.00, '2025-04-28', '2025-04-28 08:38:22', '2025-04-28 08:38:22', NULL, NULL, NULL, NULL),
(9, 9, 'BOL-u3bryGyL-9', 0.00, '2025-04-28', '2025-04-28 10:09:55', '2025-04-28 10:09:55', NULL, NULL, NULL, NULL),
(10, 10, 'BOL-7AImCYFb-10', 50.00, '2025-04-28', '2025-04-28 20:41:26', '2025-04-28 20:41:26', NULL, NULL, NULL, NULL),
(11, 11, 'BOL-0vcsU8kS-11', 50.00, '2025-04-28', '2025-04-28 21:48:28', '2025-04-28 21:48:28', NULL, NULL, NULL, NULL),
(12, 12, 'BOL-DtSxFDqT-12', 70.00, '2025-04-28', '2025-04-28 21:57:07', '2025-04-28 21:57:07', NULL, NULL, NULL, NULL),
(13, 13, 'BOL-Sj3PumF2-13', 350.50, '2025-05-02', '2025-05-03 00:44:55', '2025-05-03 00:44:55', NULL, NULL, NULL, NULL),
(14, 14, 'BOL-rdw5nMD0-14', 12.00, '2025-05-03', '2025-05-03 19:20:19', '2025-05-03 19:20:19', NULL, NULL, NULL, NULL),
(15, 15, 'BOL-bJ7KeTo1-15', 150.50, '2025-05-03', '2025-05-04 01:45:03', '2025-05-04 01:45:03', NULL, NULL, NULL, NULL),
(16, 16, 'BOL-UQCQYLQA-16', 50.00, '2025-05-03', '2025-05-04 01:47:17', '2025-05-04 01:47:17', NULL, NULL, NULL, NULL),
(17, 17, 'BOL-nbuEpY3X-17', 70.00, '2025-05-03', '2025-05-04 01:53:58', '2025-05-04 01:53:58', NULL, NULL, NULL, NULL),
(18, 18, 'BOL-bMMy1ppA-18', 70.00, '2025-05-03', '2025-05-04 02:26:15', '2025-05-04 02:26:15', NULL, NULL, NULL, NULL),
(19, 21, 'BOL-DdRSfFw2-21', 70.00, '2025-05-04', '2025-05-04 08:06:55', '2025-05-04 08:06:55', NULL, NULL, NULL, NULL),
(20, 22, 'BOL-xRTqBbuE-22', 50.00, '2025-05-04', '2025-05-04 09:00:38', '2025-05-04 09:00:38', NULL, NULL, NULL, NULL),
(21, 26, 'BOL-Fxp9jlgE-26', 50.00, '2025-05-04', '2025-05-04 09:26:48', '2025-05-04 09:26:48', NULL, NULL, NULL, NULL),
(23, 28, 'BOL-7Nj51hVO-28', 15.00, '2025-05-06', '2025-05-06 04:20:21', '2025-05-06 04:20:21', NULL, NULL, NULL, NULL),
(24, 29, 'BOL-VdRGfGFr-29', 150.50, '2025-05-06', '2025-05-06 04:34:14', '2025-05-06 04:34:14', NULL, NULL, NULL, NULL),
(25, 30, 'BOL-axm2UZ0L-30', 12.00, '2025-05-06', '2025-05-06 04:46:26', '2025-05-06 04:46:26', NULL, NULL, NULL, NULL),
(26, 31, 'BOL-cz5kw986-31', 12.00, '2025-05-06', '2025-05-06 06:54:38', '2025-05-06 06:54:38', NULL, NULL, NULL, NULL),
(27, 32, 'BOL-htrQvCRL-32', 30.50, '2025-05-09', '2025-05-09 23:55:38', '2025-05-09 23:55:38', NULL, NULL, NULL, NULL),
(28, 33, 'BOL-aQU35xQL-33', 200.00, '2025-05-12', '2025-05-12 08:07:48', '2025-05-12 08:07:48', NULL, NULL, NULL, NULL),
(29, 46, 'BOL-uZffZow3-46', 200.00, '2025-05-12', '2025-05-12 18:22:39', '2025-05-12 18:22:39', NULL, NULL, NULL, NULL),
(30, 47, 'BOL-8Swr5g5b-47', 30.50, '2025-05-12', '2025-05-12 23:02:48', '2025-05-12 23:02:48', NULL, NULL, NULL, NULL),
(31, 48, 'BOL-EhXFuryw-48', 12.00, '2025-05-12', '2025-05-12 23:46:50', '2025-05-12 23:46:50', NULL, NULL, NULL, NULL),
(32, 51, 'BOL-ajUlJUtJ-51', 0.00, '2025-05-12', '2025-05-13 00:51:27', '2025-05-13 00:51:27', NULL, NULL, NULL, NULL),
(33, 53, 'BOL-JRUPV6UB-53', 170.00, '2025-05-12', '2025-05-13 01:47:43', '2025-05-13 01:47:43', 56, 52, '[{\"area_id\":1,\"niveles\":[3,4]},{\"area_id\":2,\"niveles\":[1]}]', 'Olimpiada Nacional'),
(34, 55, 'BOL-NCXZNQ3B-55', 170.00, '2025-05-12', '2025-05-13 02:14:45', '2025-05-13 02:14:45', 58, 53, '[{\"area_id\":1,\"niveles\":[3,4]},{\"area_id\":2,\"niveles\":[1]}]', 'Olimpiada Nacional'),
(35, 58, 'BOL-US2EOCD4-58', 170.00, '2025-05-12', '2025-05-13 02:30:43', '2025-05-13 02:30:43', 61, 55, '[{\"area_id\":1,\"niveles\":[3,4]},{\"area_id\":2,\"niveles\":[1]}]', 'Olimpiada Nacional'),
(36, 59, 'BOL-JMVAH3PL-59', 190.00, '2025-05-12', '2025-05-13 02:55:44', '2025-05-13 02:55:44', 62, 56, '[{\"area_id\":1,\"niveles\":[3,4]},{\"area_id\":2,\"niveles\":[2]}]', 'Olimpiada Nacional'),
(37, 61, 'BOL-NPC7WLYX-61', 190.00, '2025-05-12', '2025-05-13 02:56:36', '2025-05-13 02:56:36', 64, 57, '[{\"area_id\":1,\"niveles\":[3,4]},{\"area_id\":2,\"niveles\":[2]}]', 'Olimpiada Nacional'),
(38, 62, 'BOL-YHZYLVHX-62', 190.00, '2025-05-12', '2025-05-13 03:07:12', '2025-05-13 03:07:12', 65, 58, '[{\"area_id\":1,\"niveles\":[3,4]},{\"area_id\":2,\"niveles\":[2]}]', 'Olimpiada Nacional'),
(39, 63, 'BOL-12ZSQ8S5-63', 190.00, '2025-05-12', '2025-05-13 03:24:36', '2025-05-13 03:24:36', 66, 59, '[{\"area_id\":1,\"niveles\":[3,4]},{\"area_id\":2,\"niveles\":[2]}]', 'Olimpiada Nacional'),
(40, 64, 'BOL-SESY8UDW-64', 12.00, '2025-05-13', '2025-05-13 04:35:10', '2025-05-13 04:35:10', 67, 60, '[{\"area_id\":6,\"niveles\":[15]}]', 'Olimpiada Nacional'),
(41, 65, 'BOL-DVMHUTZZ-65', 190.00, '2025-05-13', '2025-05-13 06:55:18', '2025-05-13 06:55:18', 68, 61, '[{\"area_id\":1,\"niveles\":[3,4]},{\"area_id\":2,\"niveles\":[2]}]', 'Olimpiada Nacional'),
(42, 66, 'BOL-IRLCPNLP-66', 12.00, '2025-05-13', '2025-05-13 23:49:28', '2025-05-13 23:49:28', 69, 62, '[{\"area_id\":6,\"niveles\":[15]}]', 'Olimpiada Nacional'),
(43, 67, 'BOL-ONZRSMGY-67', 190.00, '2025-05-13', '2025-05-14 00:09:28', '2025-05-14 00:09:28', 70, 63, '[{\"area_id\":1,\"niveles\":[3,4]},{\"area_id\":2,\"niveles\":[2]}]', 'Olimpiada Nacional'),
(44, 68, 'BOL-QBQ7ANAC-68', 30.50, '2025-05-13', '2025-05-14 00:35:58', '2025-05-14 00:35:58', 71, 64, '[{\"area_id\":5,\"niveles\":[8]}]', 'Olimpiada Nacional'),
(45, 69, 'BOL-MDT2JRYC-69', 190.00, '2025-05-13', '2025-05-14 01:04:51', '2025-05-14 01:04:51', 72, 65, '[{\"area_id\":1,\"area_nombre\":\"Matem\\u00e1ticas\",\"niveles\":[{\"nivel_id\":3,\"nivel_nombre\":\"Nivel B\\u00e1sico\"},{\"nivel_id\":4,\"nivel_nombre\":\"Nivel Intermedio\"}]},{\"area_id\":2,\"area_nombre\":\"F\\u00edsica\",\"niveles\":[{\"nivel_id\":2,\"nivel_nombre\":\"Nivel Avanzado\"}]}]', 'Olimpiada Nacional'),
(46, 70, 'BOL-1AAY8ENK-70', 150.50, '2025-05-13', '2025-05-14 01:32:16', '2025-05-14 01:32:16', 73, 66, '[{\"area_id\":1,\"area_nombre\":\"Matem\\u00e1ticas\",\"niveles\":[{\"nivel_id\":13,\"nivel_nombre\":\"Nivel B\\u00e1sico\"}]}]', 'Olimpiada Nacional'),
(47, 71, 'BOL-BXLUEPG1-71', 62.00, '2025-05-13', '2025-05-14 01:36:02', '2025-05-14 01:36:02', 74, 67, '[{\"area_id\":6,\"area_nombre\":\"area de sustos\",\"niveles\":[{\"nivel_id\":15,\"nivel_nombre\":\"ggggggggggggggg\"}]},{\"area_id\":1,\"area_nombre\":\"Matem\\u00e1ticas\",\"niveles\":[{\"nivel_id\":3,\"nivel_nombre\":\"Nivel B\\u00e1sico\"}]}]', 'Olimpiada Nacional');

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
  `nameCurso` varchar(50) NOT NULL,
  `id_inscripcion` bigint(20) UNSIGNED DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso`
--

INSERT INTO `curso` (`id_curso`, `nameCurso`, `id_inscripcion`) VALUES
(13, '1ro primaria', NULL),
(14, '2do primaria', NULL),
(15, '3ro primaria', NULL),
(16, '4to primaria', NULL),
(17, '5to primaria', NULL),
(18, '6to primaria', NULL),
(19, '1ro secundaria', NULL),
(20, '2do secundaria', NULL),
(21, '3ro secundaria', NULL),
(22, '4to secundaria', NULL),
(23, '5to secundaria', NULL),
(24, '6to secundaria', NULL);

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
(26, 'Pendiente', '2025-05-04 09:26:48', '2025-05-04 09:26:48'),
(27, 'Pendiente', '2025-05-06 04:03:52', '2025-05-06 04:03:52'),
(28, 'Pendiente', '2025-05-06 04:20:20', '2025-05-06 04:20:20'),
(29, 'Pendiente', '2025-05-06 04:34:14', '2025-05-06 04:34:14'),
(30, 'Pendiente', '2025-05-06 04:46:26', '2025-05-06 04:46:26'),
(31, 'Pendiente', '2025-05-06 06:54:38', '2025-05-06 06:54:38'),
(32, 'Pendiente', '2025-05-09 23:55:37', '2025-05-09 23:55:37'),
(33, 'Pendiente', '2025-05-12 08:07:48', '2025-05-12 08:07:48'),
(46, 'Pendiente', '2025-05-12 18:22:39', '2025-05-12 18:22:39'),
(47, 'Pendiente', '2025-05-12 23:02:47', '2025-05-12 23:02:47'),
(48, 'Pendiente', '2025-05-12 23:46:50', '2025-05-12 23:46:50'),
(51, 'Pendiente', '2025-05-13 00:51:27', '2025-05-13 00:51:27'),
(53, 'Pendiente', '2025-05-13 01:47:43', '2025-05-13 01:47:43'),
(55, 'Pendiente', '2025-05-13 02:14:45', '2025-05-13 02:14:45'),
(58, 'Pendiente', '2025-05-13 02:30:43', '2025-05-13 02:30:43'),
(59, 'Pendiente', '2025-05-13 02:55:44', '2025-05-13 02:55:44'),
(61, 'Pendiente', '2025-05-13 02:56:36', '2025-05-13 02:56:36'),
(62, 'Pendiente', '2025-05-13 03:07:12', '2025-05-13 03:07:12'),
(63, 'Pendiente', '2025-05-13 03:24:36', '2025-05-13 03:24:36'),
(64, 'Pendiente', '2025-05-13 04:35:09', '2025-05-13 04:35:09'),
(65, 'Pendiente', '2025-05-13 06:55:17', '2025-05-13 06:55:17'),
(66, 'Pendiente', '2025-05-13 23:49:28', '2025-05-13 23:49:28'),
(67, 'Pendiente', '2025-05-14 00:09:28', '2025-05-14 00:09:28'),
(68, 'Pendiente', '2025-05-14 00:35:58', '2025-05-14 00:35:58'),
(69, 'Pendiente', '2025-05-14 01:04:51', '2025-05-14 01:04:51'),
(70, 'Pendiente', '2025-05-14 01:32:15', '2025-05-14 01:32:15'),
(71, 'Pendiente', '2025-05-14 01:36:02', '2025-05-14 01:36:02');

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
(25, 26, 2, 1, '2025-05-04 09:26:48', '2025-05-04 09:26:48'),
(26, 27, 1, 4, '2025-05-06 04:03:52', '2025-05-06 04:03:52'),
(27, 28, 1, 14, '2025-05-06 04:20:21', '2025-05-06 04:20:21'),
(28, 29, 1, 13, '2025-05-06 04:34:14', '2025-05-06 04:34:14'),
(29, 30, 6, 15, '2025-05-06 04:46:26', '2025-05-06 04:46:26'),
(30, 31, 6, 15, '2025-05-06 06:54:38', '2025-05-06 06:54:38'),
(31, 32, 5, 8, '2025-05-09 23:55:38', '2025-05-09 23:55:38'),
(32, 33, 1, 12, '2025-05-12 08:07:48', '2025-05-12 08:07:48'),
(33, 46, 1, 12, '2025-05-12 18:22:39', '2025-05-12 18:22:39'),
(34, 47, 5, 8, '2025-05-12 23:02:48', '2025-05-12 23:02:48'),
(35, 48, 6, 15, '2025-05-12 23:46:50', '2025-05-12 23:46:50'),
(36, 53, 1, 3, '2025-05-13 01:47:43', '2025-05-13 01:47:43'),
(37, 53, 1, 4, '2025-05-13 01:47:43', '2025-05-13 01:47:43'),
(38, 53, 2, 1, '2025-05-13 01:47:43', '2025-05-13 01:47:43'),
(39, 55, 1, 3, '2025-05-13 02:14:45', '2025-05-13 02:14:45'),
(40, 55, 1, 4, '2025-05-13 02:14:45', '2025-05-13 02:14:45'),
(41, 55, 2, 1, '2025-05-13 02:14:45', '2025-05-13 02:14:45'),
(42, 58, 1, 3, '2025-05-13 02:30:43', '2025-05-13 02:30:43'),
(43, 58, 1, 4, '2025-05-13 02:30:43', '2025-05-13 02:30:43'),
(44, 58, 2, 1, '2025-05-13 02:30:43', '2025-05-13 02:30:43'),
(45, 59, 1, 3, '2025-05-13 02:55:44', '2025-05-13 02:55:44'),
(46, 59, 1, 4, '2025-05-13 02:55:44', '2025-05-13 02:55:44'),
(47, 59, 2, 2, '2025-05-13 02:55:44', '2025-05-13 02:55:44'),
(48, 61, 1, 3, '2025-05-13 02:56:36', '2025-05-13 02:56:36'),
(49, 61, 1, 4, '2025-05-13 02:56:36', '2025-05-13 02:56:36'),
(50, 61, 2, 2, '2025-05-13 02:56:36', '2025-05-13 02:56:36'),
(51, 62, 1, 3, '2025-05-13 03:07:12', '2025-05-13 03:07:12'),
(52, 62, 1, 4, '2025-05-13 03:07:12', '2025-05-13 03:07:12'),
(53, 62, 2, 2, '2025-05-13 03:07:12', '2025-05-13 03:07:12'),
(54, 63, 1, 3, '2025-05-13 03:24:36', '2025-05-13 03:24:36'),
(55, 63, 1, 4, '2025-05-13 03:24:36', '2025-05-13 03:24:36'),
(56, 63, 2, 2, '2025-05-13 03:24:36', '2025-05-13 03:24:36'),
(57, 64, 6, 15, '2025-05-13 04:35:10', '2025-05-13 04:35:10'),
(58, 65, 1, 3, '2025-05-13 06:55:18', '2025-05-13 06:55:18'),
(59, 65, 1, 4, '2025-05-13 06:55:18', '2025-05-13 06:55:18'),
(60, 65, 2, 2, '2025-05-13 06:55:18', '2025-05-13 06:55:18'),
(61, 66, 6, 15, '2025-05-13 23:49:28', '2025-05-13 23:49:28'),
(62, 67, 1, 3, '2025-05-14 00:09:28', '2025-05-14 00:09:28'),
(63, 67, 1, 4, '2025-05-14 00:09:28', '2025-05-14 00:09:28'),
(64, 67, 2, 2, '2025-05-14 00:09:28', '2025-05-14 00:09:28'),
(65, 68, 5, 8, '2025-05-14 00:35:58', '2025-05-14 00:35:58'),
(66, 69, 1, 3, '2025-05-14 01:04:51', '2025-05-14 01:04:51'),
(67, 69, 1, 4, '2025-05-14 01:04:51', '2025-05-14 01:04:51'),
(68, 69, 2, 2, '2025-05-14 01:04:51', '2025-05-14 01:04:51'),
(69, 70, 1, 13, '2025-05-14 01:32:16', '2025-05-14 01:32:16'),
(70, 71, 6, 15, '2025-05-14 01:36:02', '2025-05-14 01:36:02'),
(71, 71, 1, 3, '2025-05-14 01:36:02', '2025-05-14 01:36:02');

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
(31, 28, 'rrrrrrrrrrrrrrrrrr', 'rrrrrrrrrrrrrrrrrr', '33331232', '2025-05-14', 'arrrrrrrrrrrrrrrrrrd@gmail.com', '1321312', 'rrrrrrrrrrrrrrrrrr', 'rrrrrrrrrrrrrrrrrr', 'rrrrrrrrrrrrrrrrrr', '2025-05-06 04:20:21', '2025-05-06 04:20:21'),
(32, 29, 'xxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxx', '33338412', '2025-05-08', 'lala@gmail.com', '212546522015', 'xxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxx', '2025-05-06 04:34:14', '2025-05-06 04:34:14'),
(33, 30, 'bbbbbbbb', 'bbbbbbbbbb', '3333541015', '2025-05-03', 'lala@gmail.com', '1321312', 'bbbbbbbb', 'bbbbbbbb', 'bbbbbbbb', '2025-05-06 04:46:26', '2025-05-06 04:46:26'),
(34, 31, 'vvvvvvvvvvvv', 'vvvvvvvvvvvv', '33333718', '2025-05-14', 'advvvvvvvvvvvvd@gmail.com', '1321312', 'vvvvvvvvvvvv', 'vvvvvvvvvvvv', 'vvvvvvvvvvvv', '2025-05-06 06:54:38', '2025-05-06 06:54:38'),
(35, 32, 'lllllllllllllllllllllllll', 'lllllllllllllllllllllllll', '3333541', '2025-05-14', 'lllllllllllllllllllllllll@gmail.com', '2125432', 'lllllllllllllllllllllllll', 'lllllllllllllllllllllllll', 'lllllllllllllllllllllllll', '2025-05-09 23:55:38', '2025-05-09 23:55:38'),
(36, 33, 'vvvvvvvvvvvvvvvvvvvvvvvvv', 'vvvvvvvvvvvvvvvvvvvvvvvvv', '333321', '2025-05-11', 'advvvvvvvvvvvvvvvvvvvvvvvvvd@gmail.com', '21254', 'vvvvvvvvvvvvvvvvvvvvvvvvv', 'vvvvvvvvvvvvvvvvvvvvvvvvv', 'vvvvvvvvvvvvvvvvvvvvvvvvv', '2025-05-12 08:07:48', '2025-05-12 08:07:48'),
(49, 46, 'asdasdadadsa', 'asdasdadadsa', '3333451512431', '2025-05-09', 'lasdasdadadsaala@gmail.com', '1321312124', 'asdasdadadsa', 'asdasdadadsa', 'asdasdadadsa', '2025-05-12 18:22:39', '2025-05-12 18:22:39'),
(50, 47, 'kkkkkkkkkkkkkkkkkkkkkkASDkkk', 'kkkkkkkkkkkkkkkkkkkkkkkkk', '31231231213123', '2025-05-09', 'adkkkDAkkad@gmail.com', '1321312123213', 'kkkkkkkkkkkkkkASDAkkkkkkkkkkk', 'adasdadsaas', 'kkkkkkkkkkkkkkASDASDkkkkkkkkkkk', '2025-05-12 23:02:48', '2025-05-12 23:02:48'),
(51, 48, 'ttttttttttttttttttttttttttt', 'ttttttttttttttttttttttttttt', '33331241', '2025-05-11', 'atttttttttttttttttttttttttttd@gmail.com', '521', 'ttttttttttttttttttttttttttt', 'ttttttttttttttttttttttttttt', 'ttttttttttttttttttttttttttt', '2025-05-12 23:46:50', '2025-05-12 23:46:50'),
(54, 51, 'Juan', 'Pérez', '186415', '2005-06-15', 'juan.perez@example.com', '71234567', 'Colegio Nacional', 'La Paz', 'Murillo', '2025-05-13 00:51:27', '2025-05-13 00:51:27'),
(56, 53, 'Juan', 'Pérez', '125218', '2010-05-15', 'juan@example.com', '77712345', 'Colegio Modelo', 'La Paz', 'Murillo', '2025-05-13 01:47:43', '2025-05-13 01:47:43'),
(58, 55, 'Juan', 'Pérez', '1251238', '2010-05-15', 'juan@example.com', '77712345', 'Colegio Modelo', 'La Paz', 'Murillo', '2025-05-13 02:14:45', '2025-05-13 02:14:45'),
(61, 58, 'Juannnnnnnnnnnnnnn', 'Pérez', '1212238', '2010-05-15', 'juan@example.com', '7123345', 'Colegio Modelo', 'La Paz', 'Murillo', '2025-05-13 02:30:43', '2025-05-13 02:30:43'),
(62, 59, 'Ana', 'López', '987126543', '2012-08-20', 'ana.lopez@example.com', '70123456', 'Colegio Libertad', 'Cochabamba', 'Cercado', '2025-05-13 02:55:44', '2025-05-13 02:55:44'),
(64, 61, 'Ana', 'López', '9871243', '2012-08-20', 'ana.lopez@example.com', '70123456', 'Colegio Libertad', 'Cochabamba', 'Cercado', '2025-05-13 02:56:36', '2025-05-13 02:56:36'),
(65, 62, 'Anal', 'López', '912343', '2012-08-20', 'ana.lopez@example.com', '70123456', 'Colegio Libertad', 'Cochabamba', 'Cercado', '2025-05-13 03:07:12', '2025-05-13 03:07:12'),
(66, 63, 'Anal', 'López', '9123123', '2012-08-20', 'ana.lopez@example.com', '70123456', 'Colegio Libertad', 'Cochabamba', 'Cercado', '2025-05-13 03:24:36', '2025-05-13 03:24:36'),
(67, 64, 'mnnnnnnnnnnnnnnnnnnnnnnnnnn', 'mnnnnnnnnnnnnnnnnnnnnnnnnnn', '33338415', '2025-05-27', 'mnnnnnnnnnnnnnnnnnnnnnnnnnna@gmail.com', '21254564', 'mnnnnnnnnnnnnnnnnnnnnnnnnnn', 'mnnnnnnnnnnnnnnnnnnnnnnnnnn', 'mnnnnnnnnnnnnnnnnnnnnnnnnnn', '2025-05-13 04:35:10', '2025-05-13 04:35:10'),
(68, 65, 'Anal', 'López', '1233123', '2012-08-20', 'ana.lopez@example.com', '70123456', 'Colegio Libertad', 'Cochabamba', 'Cercado', '2025-05-13 06:55:18', '2025-05-13 06:55:18'),
(69, 66, 'pabito', 'alcachofa', '143843111', '2025-05-17', 'bretjstar@gmail.com', '1321312', 'america del sur', 'cochabamba', 'cercado', '2025-05-13 23:49:28', '2025-05-13 23:49:28'),
(70, 67, 'Anal', 'López', '1233963', '2012-08-20', 'ana.lopez@example.com', '70123456', 'Colegio Libertad', 'Cochabamba', 'Cercado', '2025-05-14 00:09:28', '2025-05-14 00:09:28'),
(71, 68, 'juan', 'gonsales', '333322123', '2025-05-10', 'adasdsad@gmail.com', '13213121121', 'america del sur', 'cbba', 'cercado', '2025-05-14 00:35:58', '2025-05-14 00:35:58'),
(72, 69, 'Analas', 'López', '12339263', '2012-08-20', 'ana.lopez@example.com', '70123456', 'Colegio Libertad', 'Cochabamba', 'Cercado', '2025-05-14 01:04:51', '2025-05-14 01:04:51'),
(73, 70, 'juan', 'haha', '33331123', '2025-05-27', 'adadasd@gmail.com', '123123', 'america del sur', 'cbba', 'cercado', '2025-05-14 01:32:16', '2025-05-14 01:32:16'),
(74, 71, 'gggggggggggggggggggg', 'haha', '333322', '2025-05-03', 'lala@gmail.com', '1321312', 'gggggggggggggggggggg', 'qqqqqqqqqqqqqqqqqqq', 'gggggggggggggggggggg', '2025-05-14 01:36:02', '2025-05-14 01:36:02');

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
(29, 27, 'qqqqqqqqqqqqqqqqqqq', 'qqqqqqqqqqqqqqqqqqq', '635154', 'qqqqqqqqqqqqqqqqqqq@gmail.com', '12341231', '2025-05-06 04:03:52', '2025-05-06 04:03:52', 'papa/mama'),
(30, 28, 'rrrrrrrrrrrrrrrrrr', 'rrrrrrrrrrrrrrrrrr', '635112312', 'asdsad@gmail.com', '85253', '2025-05-06 04:20:21', '2025-05-06 04:20:21', 'papa/mama'),
(31, 29, 'xxxxxxxxxxxxxxxx', 'xxxxxxxxxxxxxxxx', '6351834', 'hahahaha@gmail.com', '8525', '2025-05-06 04:34:14', '2025-05-06 04:34:14', 'profesor'),
(32, 30, 'bbbbbbbb', 'bbbbbbbb', '1503125', 'hahahaha@gmail.com', '8525', '2025-05-06 04:46:26', '2025-05-06 04:46:26', 'estudiante'),
(33, 31, 'vvvvvvvvvvvv', 'vvvvvvvvvvvv', '68417', 'asdavvvvvvvvvvvvd@gmail.com', '1231', '2025-05-06 06:54:38', '2025-05-06 06:54:38', 'profesor'),
(34, 32, 'lllllllllllllllllllllllll', 'lllllllllllllllllllllllll', '6351321', 'allllllllllllllllllllllllld@gmail.com', '852521', '2025-05-09 23:55:38', '2025-05-09 23:55:38', 'estudiante'),
(35, 33, 'vvvvvvvvvvvvvvvvvvvvvvvvv', 'vvvvvvvvvvvvvvvvvvvvvvvvv', '635121', 'vvvvvvvvvvvvvvvvvvvvvvvvvd@gmail.com', '8525', '2025-05-12 08:07:48', '2025-05-12 08:07:48', 'profesor'),
(48, 46, 'asdasdadadsa', 'asdasdadadsa', '21421312', 'aasdasdadadsad@gmail.com', '8525', '2025-05-12 18:22:39', '2025-05-12 18:22:39', 'profesor'),
(49, 47, 'kkkkkkkkkkkkkkkkkkkkkkkkk', 'fsdfsdfsd', '35143541124385287', 'asdasd@gmail.com', '13123123', '2025-05-12 23:02:48', '2025-05-12 23:02:48', 'profesor'),
(50, 48, 'ttttttttttttttttttttttttttt', 'ttttttttttttttttttttttttttt', '21454', 'attttttttttttttttttttttttttt@gmail.com', '123151', '2025-05-12 23:46:50', '2025-05-12 23:46:50', 'papa/mama'),
(51, 51, 'María', 'Gonzales', '8752452', 'maria.gonzales@example.com', '78945612', '2025-05-13 00:51:27', '2025-05-13 00:51:27', 'Tía del alumno'),
(52, 53, 'María', 'González', '875161', 'maria@example.com', '70754321', '2025-05-13 01:47:43', '2025-05-13 01:47:43', 'Madre'),
(53, 55, 'María', 'González', '8712311', 'maria@example.com', '70754321', '2025-05-13 02:14:45', '2025-05-13 02:14:45', 'Madre'),
(55, 58, 'Maríaaaaaaaaa', 'González', '87122311', 'maria@example.com', '70754321', '2025-05-13 02:30:43', '2025-05-13 02:30:43', 'Madre'),
(56, 59, 'Carlos', 'Mendoza', '1234821765', 'carlos.mendoza@example.com', '70765432', '2025-05-13 02:55:44', '2025-05-13 02:55:44', 'Padre'),
(57, 61, 'Carlos', 'Mendoza', '12121765', 'carlos.mendoza@example.com', '70765432', '2025-05-13 02:56:36', '2025-05-13 02:56:36', 'Padre'),
(58, 62, 'Carlosss', 'Mendoza', '1211235', 'carlos.mendoza@example.com', '70765432', '2025-05-13 03:07:12', '2025-05-13 03:07:12', 'Padre'),
(59, 63, 'Carlosss', 'Mendoza', '12111235', 'carlos.mendoza@example.com', '70765432', '2025-05-13 03:24:36', '2025-05-13 03:24:36', 'Padre'),
(60, 64, 'mnnnnnnnnnnnnnnnnnnnnnnnnnn', 'mnnnnnnnnnnnnnnnnnnnnnnnnnn', '214512', 'amnnnnnnnnnnnnnnnnnnnnnnnnnnd@gmail.com', '8525541', '2025-05-13 04:35:10', '2025-05-13 04:35:10', 'papa/mama'),
(61, 65, 'Carlosss', 'Mendoza', '1311235', 'carlos.mendoza@example.com', '70765432', '2025-05-13 06:55:18', '2025-05-13 06:55:18', 'Padre'),
(62, 66, 'judit', 'gongora', '143843177', 'yosueanverson12@gmail.com', '852532', '2025-05-13 23:49:28', '2025-05-13 23:49:28', 'profesor'),
(63, 67, 'Carlosss', 'Mendoza', '137535', 'carlos.mendoza@example.com', '70765432', '2025-05-14 00:09:28', '2025-05-14 00:09:28', 'Padre'),
(64, 68, 'judit', 'gongora', '1231231212', 'asas@gmail.com', '8525', '2025-05-14 00:35:58', '2025-05-14 00:35:58', 'papa/mama'),
(65, 69, 'Carl21osss', 'Mendoza', '137212135', 'carlos.mendoza@example.com', '70765432', '2025-05-14 01:04:51', '2025-05-14 01:04:51', 'Padre'),
(66, 70, 'judit', 'gongora', '2145323', 'assadsad@gmail.com', '3642156212321', '2025-05-14 01:32:16', '2025-05-14 01:32:16', 'profesor'),
(67, 71, 'judit', 'gggggggggggggggggggg', '31412412', 'yosueanverson12@gmail.com', '8525', '2025-05-14 01:36:02', '2025-05-14 01:36:02', 'profesor');

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
  ADD KEY `id_inscripcion` (`id_inscripcion`),
  ADD KEY `id_olimpista` (`id_olimpista`),
  ADD KEY `id_tutor` (`id_tutor`);

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
  MODIFY `id_boleta` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=48;

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
  MODIFY `id_inscripcion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

--
-- AUTO_INCREMENT de la tabla `inscripcion_area_nivel`
--
ALTER TABLE `inscripcion_area_nivel`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=72;

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
  MODIFY `id_olimpista` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=75;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tutors`
--
ALTER TABLE `tutors`
  MODIFY `id_tutor` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=68;

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
  ADD CONSTRAINT `boleta_pagos_ibfk_1` FOREIGN KEY (`id_inscripcion`) REFERENCES `inscripcions` (`id_inscripcion`),
  ADD CONSTRAINT `boleta_pagos_ibfk_2` FOREIGN KEY (`id_olimpista`) REFERENCES `olimpistas` (`id_olimpista`),
  ADD CONSTRAINT `boleta_pagos_ibfk_3` FOREIGN KEY (`id_tutor`) REFERENCES `tutors` (`id_tutor`);

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
