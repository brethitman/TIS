-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-03-2025 a las 03:53:30
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
-- Base de datos: `umss3`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `areas`
--

CREATE TABLE `areas` (
  `id_area` bigint(20) UNSIGNED NOT NULL,
  `nombre_area` varchar(100) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `areas`
--

INSERT INTO `areas` (`id_area`, `nombre_area`, `descripcion`, `created_at`, `updated_at`) VALUES 
(1, 'Matemáticas', 'Desde 5to de Primaria hasta 5to de Secundaria', '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(2, 'Informática', 'Desde 1ro de Secundaria hasta 3ro de Secundaria', '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(3, 'Física', 'Desde 4to de Secundaria hasta 6to de Secundaria', '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(4, 'Biología', 'Desde 1ro de Primaria hasta 4to de Secundaria', '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(5, 'Química', 'Desde 3ro de Primaria hasta 4to de Secundaria', '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(6, 'Robótica', 'Desde 2do de Secundaria hasta 6to de Secundaria', '2025-03-19 12:43:41', '2025-03-19 12:43:41');


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `boleta_pagos`
--

CREATE TABLE `boleta_pagos` (
  `id_boleta` bigint(20) UNSIGNED NOT NULL,
  `id_inscripcion` bigint(20) UNSIGNED NOT NULL,
  `numero_boleta` varchar(50) NOT NULL,
  `monto` decimal(10,2) NOT NULL,
  `fecha_generacion` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `boleta_pagos`
--

INSERT INTO `boleta_pagos` (`id_boleta`, `id_inscripcion`, `numero_boleta`, `monto`, `fecha_generacion`, `created_at`, `updated_at`) VALUES
(26, 1, 'BOLETA-001', 150.00, '2025-03-19', '2025-03-19 12:41:02', '2025-03-19 12:41:02'),
(27, 2, 'BOLETA-002', 200.00, '2025-03-18', '2025-03-19 12:41:02', '2025-03-19 12:41:02'),
(28, 3, 'BOLETA-003', 175.00, '2025-03-17', '2025-03-19 12:41:02', '2025-03-19 12:41:02'),
(29, 4, 'BOLETA-004', 250.00, '2025-03-16', '2025-03-19 12:41:02', '2025-03-19 12:41:02'),
(30, 5, 'BOLETA-005', 180.00, '2025-03-15', '2025-03-19 12:41:02', '2025-03-19 12:41:02');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comprobante_pagos`
--

CREATE TABLE `comprobante_pagos` (
  `id_comprobante` bigint(20) UNSIGNED NOT NULL,
  `id_boleta` bigint(20) UNSIGNED NOT NULL,
  `archivo_comprobante` varchar(255) NOT NULL,
  `numero_comprobante` varchar(50) DEFAULT NULL,
  `nombre_pagador` varchar(100) DEFAULT NULL,
  `estado_verificacion` enum('Pendiente','Verificado','Rechazado') NOT NULL DEFAULT 'Pendiente',
  `fecha_subida` date NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `comprobante_pagos`
--

INSERT INTO `comprobante_pagos` (`id_comprobante`, `id_boleta`, `archivo_comprobante`, `numero_comprobante`, `nombre_pagador`, `estado_verificacion`, `fecha_subida`, `created_at`, `updated_at`) VALUES
(1, 26, 'comprobante1.pdf', '001-001', 'Juan Pérez', 'Pendiente', '2023-10-01', '2025-03-19 12:48:38', '2025-03-19 12:48:38'),
(2, 27, 'comprobante2.pdf', '001-002', 'María Gómez', 'Verificado', '2023-10-02', '2025-03-19 12:48:38', '2025-03-19 12:48:38'),
(3, 28, 'comprobante3.pdf', '001-003', 'Carlos López', 'Rechazado', '2023-10-03', '2025-03-19 12:48:38', '2025-03-19 12:48:38'),
(4, 29, 'comprobante4.pdf', '001-004', 'Ana Martínez', 'Pendiente', '2023-10-04', '2025-03-19 12:48:38', '2025-03-19 12:48:38'),
(5, 30, 'comprobante5.pdf', '001-005', 'Luis Ramírez', 'Verificado', '2023-10-05', '2025-03-19 12:48:38', '2025-03-19 12:48:38');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inscripcions`
--

CREATE TABLE `inscripcions` (
  `id_inscripcion` bigint(20) UNSIGNED NOT NULL,
  `id_olimpista` bigint(20) UNSIGNED NOT NULL,
  `id_area` bigint(20) UNSIGNED NOT NULL,
  `id_tutor` bigint(20) UNSIGNED NOT NULL,
  `fecha_inscripcion` date NOT NULL,
  `estado` enum('Pendiente','Pagado','Verificado') NOT NULL DEFAULT 'Pendiente',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `inscripcions`
--

INSERT INTO `inscripcions` (`id_inscripcion`, `id_olimpista`, `id_area`, `id_tutor`, `fecha_inscripcion`, `estado`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 1, '2025-03-19', 'Pendiente', NULL, NULL),
(2, 2, 2, 2, '2025-03-18', 'Pagado', NULL, NULL),
(3, 3, 3, 3, '2025-03-17', 'Verificado', NULL, NULL),
(4, 4, 4, 4, '2025-03-16', 'Pendiente', NULL, NULL),
(5, 5, 5, 5, '2025-03-15', 'Pendiente', NULL, NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2025_03_19_111121_create_personal_access_tokens_table', 1),
(5, '2025_03_19_111635_create_areas_table', 1),
(6, '2025_03_19_111635_create_olimpistas_table', 2),
(7, '2025_03_19_111635_create_tutors_table', 2),
(8, '2025_03_19_111636_create_boleta_pagos_table', 2),
(9, '2025_03_19_111636_create_comprobante_pagos_table', 2),
(10, '2025_03_19_111637_create_nivel_categorias_table', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `nivel_categorias`
--

CREATE TABLE `nivel_categorias` (
  `id_nivel` bigint(20) UNSIGNED NOT NULL,
  `id_area` bigint(20) UNSIGNED NOT NULL,
  `nombre_nivel` varchar(100) NOT NULL,
  `descripcion` varchar(50) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `fecha_examen` date DEFAULT NULL,
  `costo` decimal(10,2) NOT NULL,
  `habilitacion` tinyint(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `nivel_categorias`
--

INSERT INTO `nivel_categorias` (`id_nivel`, `id_area`, `nombre_nivel`, `descripcion`, `fecha_examen`, `costo`, `habilitacion`, `created_at`, `updated_at`) VALUES
(1, 1, '1B', '5to de Secundaria', '2025-09-20 15:00:00', 15.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(2, 1, '2M', '1ro de Secundaria', '2025-09-18 15:00:00', 15.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(3, 2, '3B', '2do de Secundaria', '2025-09-15 10:30:00', 20.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(4, 2, '4M', '3ro de Secundaria', '2025-09-10 08:00:00', 18.50, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(5, 3, '5B', '4to de Secundaria', '2025-09-12 14:00:00', 17.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(6, 3, '6M', '6to de Secundaria', '2025-09-22 16:00:00', 25.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(7, 4, '1P', '1ro de Primaria', '2025-09-05 09:30:00', 10.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(8, 4, '2P', '2do de Primaria', '2025-09-07 11:00:00', 12.50, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(9, 5, '3P', '3ro de Primaria', '2025-09-09 13:45:00', 13.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(10, 5, '4P', '4to de Primaria', '2025-09-11 15:30:00', 14.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(11, 6, '5P', '5to de Primaria', '2025-09-13 10:00:00', 15.50, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(12, 6, '6P', '6to de Primaria', '2025-09-17 14:30:00', 16.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(13, 1, '1S', '1ro de Secundaria', '2025-09-19 12:00:00', 18.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(14, 2, '2S', '2do de Secundaria', '2025-09-21 09:00:00', 19.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(15, 3, '3S', '3ro de Secundaria', '2025-09-23 10:30:00', 21.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(16, 4, '4S', '4to de Secundaria', '2025-09-25 14:45:00', 22.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(17, 5, '5S', '5to de Secundaria', '2025-09-27 11:15:00', 23.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(18, 6, '6S', '6to de Secundaria', '2025-09-29 13:00:00', 24.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(19, 1, '7P', '5to de Primaria', '2025-10-02 10:00:00', 15.00, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41'),
(20, 2, '8P', '5to de Primaria', '2025-10-04 15:30:00', 15.50, NULL, '2025-03-19 12:43:41', '2025-03-19 12:43:41');


-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `olimpistas`
--

CREATE TABLE `olimpistas` (
  `id_olimpista` bigint(20) UNSIGNED NOT NULL,
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `olimpistas`
--

INSERT INTO `olimpistas` (`id_olimpista`, `nombres`, `apellidos`, `ci`, `fecha_nacimiento`, `correo`, `telefono`, `colegio`, `curso`, `departamento`, `provincia`, `created_at`, `updated_at`) VALUES
(1, 'Juan', 'Pérez', '12345678', '2000-01-15', 'juan.perez@example.com', '789456123', 'Colegio Nacional', '3ro de Secundaria', 'Santa Cruz', 'Provincia A', '2025-03-19 12:45:36', '2025-03-19 12:45:36'),
(2, 'María', 'López', '23456789', '1998-06-22', 'maria.lopez@example.com', '321654987', 'Colegio San José', '4to de Bachillerato', 'Cochabamba', 'Provincia B', '2025-03-19 12:45:36', '2025-03-19 12:45:36'),
(3, 'Carlos', 'García', '34567890', '1995-11-10', 'carlos.garcia@example.com', '654789123', 'Colegio La Salle', '1ro de Universidad', 'La Paz', 'Provincia C', '2025-03-19 12:45:36', '2025-03-19 12:45:36'),
(4, 'Ana', 'Martínez', '45678901', '2002-04-30', 'ana.martinez@example.com', '987654321', 'Colegio Maristas', '2do de Secundaria', 'Oruro', 'Provincia D', '2025-03-19 12:45:36', '2025-03-19 12:45:36'),
(5, 'Luis', 'Rodríguez', '56789012', '2001-08-25', 'luis.rodriguez@example.com', '159753456', 'Colegio del Sol', '5to de Bachillerato', 'Potosí', 'Provincia E', '2025-03-19 12:45:36', '2025-03-19 12:45:36');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tutors`
--

CREATE TABLE `tutors` (
  `id_tutor` bigint(20) UNSIGNED NOT NULL,
  `nombres` varchar(100) NOT NULL,
  `apellidos` varchar(100) NOT NULL,
  `ci` varchar(20) NOT NULL,
  `correo` varchar(100) NOT NULL,
  `telefono` varchar(20) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `tutors`
--

INSERT INTO `tutors` (`id_tutor`, `nombres`, `apellidos`, `ci`, `correo`, `telefono`, `created_at`, `updated_at`) VALUES
(1, 'Juan', 'Pérez', '12345678', 'juan.perez@email.com', '1234567890', '2025-03-19 12:35:12', '2025-03-19 12:35:12'),
(2, 'Maria', 'González', '87654321', 'maria.gonzalez@email.com', '0987654321', '2025-03-19 12:35:12', '2025-03-19 12:35:12'),
(3, 'Carlos', 'Rodríguez', '11223344', 'carlos.rodriguez@email.com', '1122334455', '2025-03-19 12:35:12', '2025-03-19 12:35:12'),
(4, 'Ana', 'Martínez', '44332211', 'ana.martinez@email.com', '6677889900', '2025-03-19 12:35:12', '2025-03-19 12:35:12'),
(5, 'Luis', 'Hernández', '55667788', 'luis.hernandez@email.com', '3344556677', '2025-03-19 12:35:12', '2025-03-19 12:35:12');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `areas`
--
ALTER TABLE `areas`
  ADD PRIMARY KEY (`id_area`),
  ADD UNIQUE KEY `areas_nombre_area_unique` (`nombre_area`);

--
-- Indices de la tabla `boleta_pagos`
--
ALTER TABLE `boleta_pagos`
  ADD PRIMARY KEY (`id_boleta`),
  ADD UNIQUE KEY `boleta_pagos_numero_boleta_unique` (`numero_boleta`),
  ADD KEY `boleta_pagos_id_inscripcion_foreign` (`id_inscripcion`);

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
  ADD KEY `comprobante_pagos_id_boleta_foreign` (`id_boleta`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `inscripcions`
--
ALTER TABLE `inscripcions`
  ADD PRIMARY KEY (`id_inscripcion`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

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
  ADD KEY `nivel_categorias_id_area_foreign` (`id_area`);

--
-- Indices de la tabla `olimpistas`
--
ALTER TABLE `olimpistas`
  ADD PRIMARY KEY (`id_olimpista`);

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
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
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
  ADD UNIQUE KEY `tutors_ci_unique` (`ci`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `areas`
--
ALTER TABLE `areas`
  MODIFY `id_area` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `boleta_pagos`
--
ALTER TABLE `boleta_pagos`
  MODIFY `id_boleta` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=31;

--
-- AUTO_INCREMENT de la tabla `comprobante_pagos`
--
ALTER TABLE `comprobante_pagos`
  MODIFY `id_comprobante` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `inscripcions`
--
ALTER TABLE `inscripcions`
  MODIFY `id_inscripcion` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `nivel_categorias`
--
ALTER TABLE `nivel_categorias`
  MODIFY `id_nivel` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `olimpistas`
--
ALTER TABLE `olimpistas`
  MODIFY `id_olimpista` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `tutors`
--
ALTER TABLE `tutors`
  MODIFY `id_tutor` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `boleta_pagos`
--
ALTER TABLE `boleta_pagos`
  ADD CONSTRAINT `boleta_pagos_id_inscripcion_foreign` FOREIGN KEY (`id_inscripcion`) REFERENCES `inscripcions` (`id_inscripcion`) ON DELETE CASCADE;

--
-- Filtros para la tabla `comprobante_pagos`
--
ALTER TABLE `comprobante_pagos`
  ADD CONSTRAINT `comprobante_pagos_id_boleta_foreign` FOREIGN KEY (`id_boleta`) REFERENCES `boleta_pagos` (`id_boleta`) ON DELETE CASCADE;

--
-- Filtros para la tabla `nivel_categorias`
--
ALTER TABLE `nivel_categorias`
  ADD CONSTRAINT `nivel_categorias_id_area_foreign` FOREIGN KEY (`id_area`) REFERENCES `areas` (`id_area`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
