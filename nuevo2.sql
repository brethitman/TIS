-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2025 a las 03:24:31
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
-- Base de datos: `nuevo2`
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
(2, 2, 'Física', 'Área de resolución de problemas físicos', '1ro', '5to', '2025-04-27 20:11:32', '2025-04-27 20:11:32');

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
(12, 12, 'BOL-DtSxFDqT-12', 70.00, '2025-04-28', '2025-04-28 21:57:07', '2025-04-28 21:57:07');

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
(1, 'Primero de Primaria'),
(2, 'Segundo de Primaria'),
(3, 'Tercero de Primaria'),
(4, 'Cuarto de Primaria'),
(5, 'Quinto de Primaria'),
(6, 'Sexto de Primaria'),
(7, 'Primero de Secundaria'),
(8, 'Segundo de Secundaria'),
(9, 'Tercero de Secundaria'),
(10, 'Bachillerato - 1er año'),
(11, 'Bachillerato - 2do año'),
(12, 'Bachillerato - 3er año');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `curso_nivel`
--

CREATE TABLE `curso_nivel` (
  `id_curso_nivel` bigint(20) NOT NULL,
  `id_curso` bigint(20) NOT NULL,
  `id_nivel` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `curso_nivel`
--

INSERT INTO `curso_nivel` (`id_curso_nivel`, `id_curso`, `id_nivel`) VALUES
(1, 1, 2),
(2, 1, 3),
(3, 2, 1),
(4, 3, 2),
(5, 4, 3),
(6, 5, 1),
(7, 6, 2),
(8, 7, 3),
(9, 8, 1),
(10, 9, 2);

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
  `fecha_inscripcion` date NOT NULL,
  `estado` enum('Pendiente','Pagado','Verificado') NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inscripcions`
--

INSERT INTO `inscripcions` (`id_inscripcion`, `fecha_inscripcion`, `estado`, `created_at`, `updated_at`) VALUES
(1, '2025-04-01', 'Pendiente', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(2, '2025-04-28', 'Pendiente', '2025-04-28 00:36:54', '2025-04-28 00:36:54'),
(3, '2025-04-28', 'Pendiente', '2025-04-28 01:31:33', '2025-04-28 01:31:33'),
(4, '2025-04-22', 'Pendiente', '2025-04-28 08:09:46', '2025-04-28 08:09:46'),
(5, '2025-04-19', 'Pendiente', '2025-04-28 08:18:38', '2025-04-28 08:18:38'),
(6, '2025-04-28', 'Pendiente', '2025-04-28 08:24:48', '2025-04-28 08:24:48'),
(7, '2025-04-19', 'Pendiente', '2025-04-28 08:32:15', '2025-04-28 08:32:15'),
(8, '2025-04-18', 'Pendiente', '2025-04-28 08:38:22', '2025-04-28 08:38:22'),
(9, '2025-04-27', 'Pendiente', '2025-04-28 10:09:55', '2025-04-28 10:09:55'),
(10, '2025-04-26', 'Pendiente', '2025-04-28 20:41:25', '2025-04-28 20:41:25'),
(11, '2025-04-17', 'Pendiente', '2025-04-28 21:48:28', '2025-04-28 21:48:28'),
(12, '2025-04-20', 'Pendiente', '2025-04-28 21:57:07', '2025-04-28 21:57:07');

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
(15, 12, 1, 4, '2025-04-28 21:57:07', '2025-04-28 21:57:07');

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
(7, 1, 'Nivel Olimpiadas', 'Nivel especial para olimpiadas', '2025-07-01', 150.00, 1, '1° Secundaria', 'Universidad', '2025-04-28 14:35:18', '2025-04-28 14:35:18');

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
(3, 'Segunda Olimpiada Internacional de Ciencias 2024', 'Evento internacional que cubre física, química y biología con participantes de 20 países', '2024-07-10', '2024-07-15', '2025-04-29 01:20:34', '2025-04-29 01:20:34'),
(4, 'Olimpiada Boliviana de Informática 2023', 'Competencia de programación y algoritmos para estudiantes universitarios', '2023-09-01', '2023-09-03', '2025-04-29 01:20:34', '2025-04-29 01:20:34'),
(5, 'Olimpiada de Robótica Educativa 2024', 'Evento nacional de diseño y programación de robots para estudiantes de 12-18 años', '2024-03-20', '2024-03-23', '2025-04-29 01:20:34', '2025-04-29 01:20:34'),
(6, 'Olimpiada Andina de Física 2025', 'Competencia regional de física para países miembros de la Comunidad Andina', '2025-11-05', '2025-11-09', '2025-04-29 01:20:34', '2025-04-29 01:20:34');

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
  `curso` varchar(50) NOT NULL,
  `departamento` varchar(50) NOT NULL,
  `provincia` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `olimpistas`
--

INSERT INTO `olimpistas` (`id_olimpista`, `id_inscripcion`, `nombres`, `apellidos`, `ci`, `fecha_nacimiento`, `correo`, `telefono`, `colegio`, `curso`, `departamento`, `provincia`, `created_at`, `updated_at`) VALUES
(1, 1, 'Juan', 'Pérez', '12345678', '2005-05-10', 'juan.perez@correo.com', '555-1234', 'Colegio A', '1ro', 'Departamento 1', 'Provincia 1', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(2, 2, 'Carlos', 'Mamani', '10203040', '2011-08-20', 'carlos.m@ejemplo.com', '70101010', 'Unidad Educativa Central', '6to Primaria', 'Cochabamba', 'Cercado', '2025-04-28 00:36:54', '2025-04-28 00:36:54'),
(3, 2, 'Sofia', 'Flores', '20304050', '2009-03-01', 'sofia.f@ejemplo.com', '60202020', 'Colegio Bicentenario', '2do Secundaria', 'Santa Cruz', 'Warnes', '2025-04-28 00:36:54', '2025-04-28 00:36:54'),
(4, 3, 'Carlos', 'Mamani', '10153040', '2011-08-20', 'carlos.m@ejemplo.com', '70101010', 'Unidad Educativa Central', '6to Primaria', 'Cochabamba', 'Cercado', '2025-04-28 01:31:33', '2025-04-28 01:31:33'),
(5, 3, 'Sofia', 'Flores', '20324050', '2009-03-01', 'sofia.f@ejemplo.com', '60202020', 'Colegio Bicentenario', '2do Secundaria', 'Santa Cruz', 'Warnes', '2025-04-28 01:31:33', '2025-04-28 01:31:33'),
(6, 4, 'asdasdas', 'dasasdasdas', '123123213', '2025-04-10', 'adasdsad@gmail.com', '1321312', 'asdsadas', 'asdsadas', 'asdasdas', 'asdasdasd', '2025-04-28 08:09:46', '2025-04-28 08:09:46'),
(7, 5, 'pepe', 'pepe', '3333', '2025-04-24', 'pepe@gmail.com', '1321312', 'pepe', 'pepe', 'pepe', 'pepe', '2025-04-28 08:18:38', '2025-04-28 08:18:38'),
(8, 6, 'pepardo', 'matis', '10154240', '2011-08-20', 'carlos.m@ejemplo.com', '704201010', 'Unidad Educativa Central', '6to Primaria', 'Cochabamba', 'Cercado', '2025-04-28 08:24:48', '2025-04-28 08:24:48'),
(9, 7, 'lala', 'lala', '33331', '2025-04-18', 'lala@gmail.com', '21254', 'pepe', 'pepe', 'pepe', 'pepe', '2025-04-28 08:32:15', '2025-04-28 08:32:15'),
(10, 8, 'ga', 'dasasdasdas', '333322', '2025-04-25', 'adasdsad@gmail.com', '1321312', 'asdsadas', 'pepe', 'pepe', 'pepe', '2025-04-28 08:38:22', '2025-04-28 08:38:22'),
(11, 9, 'jaja', 'jaja', '33222', '2025-04-05', 'jaja@gmail.com', '1321312', 'pepe', 'pepe', 'asdasdas', 'asdasdasd', '2025-04-28 10:09:55', '2025-04-28 10:09:55'),
(12, 10, 'josue', 'mamani calani', '14384311', '2025-04-11', 'josue@gmail.com', '133654', 'america del sur', '6to de secundaria', 'cbba', 'cercado', '2025-04-28 20:41:25', '2025-04-28 20:41:25'),
(13, 11, 'juan', 'gonsales', '143843114', '2025-04-18', 'adasdsad@gmail.com', '13213121', 'asdsadas', '6to de secundaria', 'pepe', 'pepe', '2025-04-28 21:48:28', '2025-04-28 21:48:28'),
(14, 12, 'haha', 'haha', '332224', '2025-04-18', 'adasdsad@gmail.com', '1321312', 'pepe', '6to de secundaria', 'pepe', 'asdasdasd', '2025-04-28 21:57:07', '2025-04-28 21:57:07');

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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tutors`
--

INSERT INTO `tutors` (`id_tutor`, `id_inscripcion`, `nombres`, `apellidos`, `ci`, `correo`, `telefono`, `created_at`, `updated_at`) VALUES
(1, 1, 'Ana', 'Gómez', '87654321', 'ana.gomez@correo.com', '555-5678', '2025-04-27 20:11:32', '2025-04-27 20:11:32'),
(2, 2, 'Roberto', 'Quispe', '30405060', 'roberto.q@ejemplo.com', '77513030', '2025-04-28 00:36:54', '2025-04-28 00:36:54'),
(3, 2, 'pepe', 'gonsales', '3035060', 'robe5rto.q@ejemplo.com', '73603030', '2025-04-28 00:36:54', '2025-04-28 00:36:54'),
(4, 3, 'Roberto', 'Quispe', '3042460', 'roberto.q@ejemplo.com', '77513030', '2025-04-28 01:31:33', '2025-04-28 01:31:33'),
(5, 3, 'pepe', 'gonsales', '3033460', 'robe5rto.q@ejemplo.com', '73603030', '2025-04-28 01:31:33', '2025-04-28 01:31:33'),
(6, 4, 'fdfsfds', 'fsdfsdfsd', '12312312', 'asdasd@gmail.com', '12341231', '2025-04-28 08:09:46', '2025-04-28 08:09:46'),
(7, 5, 'pepepepe', 'pepepepe', '6351', 'pepepepe@gmail.com', '554742', '2025-04-28 08:18:38', '2025-04-28 08:18:38'),
(8, 6, 'Roberto', 'Quispe', '3024460', 'roberto.q@ejemplo.com', '77513030', '2025-04-28 08:24:48', '2025-04-28 08:24:48'),
(9, 6, 'pepe', 'gonsales', '3553460', 'robe5rto.q@ejemplo.com', '73603030', '2025-04-28 08:24:48', '2025-04-28 08:24:48'),
(10, 7, 'lalalala', 'lalalala', '214', 'lala@gmail.com', '8525', '2025-04-28 08:32:15', '2025-04-28 08:32:15'),
(11, 8, 'fdfsfds', 'fsdfsdfsd', '21421', 'asdasd@gmail.com', '123412312', '2025-04-28 08:38:22', '2025-04-28 08:38:22'),
(12, 9, 'jajajaja', 'jajajaja', '63512', 'jajajaja@gmail.com', '1231', '2025-04-28 10:09:55', '2025-04-28 10:09:55'),
(13, 10, 'judit', 'gongora', '356971', 'judit@gmail.com', '36421562', '2025-04-28 20:41:25', '2025-04-28 20:41:25'),
(14, 11, 'pepepepe', 'pepepepe', '63518', 'lala@gmail.com', '554742', '2025-04-28 21:48:28', '2025-04-28 21:48:28'),
(15, 12, 'lalalala', 'pepepepe', '123123122', 'hahahaha@gmail.com', '1231', '2025-04-28 21:57:07', '2025-04-28 21:57:07');

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
  MODIFY `id_area` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `boleta_pagos`
--
ALTER TABLE `boleta_pagos`
  MODIFY `id_boleta` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `comprobante_pagos`
--
ALTER TABLE `comprobante_pagos`
  MODIFY `id_comprobante` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `curso`
--
ALTER TABLE `curso`
  MODIFY `id_curso` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

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
  MODIFY `id_inscripcion` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `inscripcion_area_nivel`
--
ALTER TABLE `inscripcion_area_nivel`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
  MODIFY `id_nivel` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `olimpiadas`
--
ALTER TABLE `olimpiadas`
  MODIFY `id_olimpiada` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `olimpistas`
--
ALTER TABLE `olimpistas`
  MODIFY `id_olimpista` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tutors`
--
ALTER TABLE `tutors`
  MODIFY `id_tutor` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

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
