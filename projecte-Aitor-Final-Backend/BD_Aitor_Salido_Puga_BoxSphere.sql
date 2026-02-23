/*Base de dades exportada de mysql*/


SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

DROP DATABASE IF EXISTS garatge_virtual;
CREATE DATABASE garatge_virtual;
USE garatge_virtual;

CREATE TABLE `consum` (
  `id_consum` int(11) NOT NULL,
  `id_vehicle` int(11) NOT NULL,
  `data` date NOT NULL,
  `litres` decimal(6,2) DEFAULT NULL COMMENT 'Para gasolina/diesel/hibrid',
  `kwh` decimal(6,2) DEFAULT NULL COMMENT 'Para electrico/hibrid',
  `cost_total` decimal(8,2) DEFAULT NULL,
  `quilometres_actuals` int(11) NOT NULL,
  `consum_mitja_obc` decimal(5,2) DEFAULT NULL COMMENT 'Consumo medio que marca el coche'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `consum` (`id_consum`, `id_vehicle`, `data`, `litres`, `kwh`, `cost_total`, `quilometres_actuals`, `consum_mitja_obc`) VALUES
(1, 1, '2025-10-01', 45.50, 12.00, 85.00, 15000, 6.50),
(2, 2, '2025-09-15', 75.00, NULL, 115.00, 290000, 9.50),
(3, 3, '2025-10-03', NULL, 55.00, 18.00, 10500, 16.20);



CREATE TABLE `forum` (
  `id_post` int(11) NOT NULL,
  `id_usuari` int(11) NOT NULL,
  `id_vehicle` int(11) DEFAULT NULL,
  `titol` varchar(150) NOT NULL,
  `contingut` text NOT NULL,
  `data_publicacio` date DEFAULT curdate(),
  `likes` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `itv` (
  `id_itv` int(11) NOT NULL,
  `id_vehicle` int(11) NOT NULL,
  `data_visita` date NOT NULL,
  `resultat` enum('Favorable','Desfavorable','Condicional') NOT NULL,
  `observacions` text DEFAULT NULL,
  `quilometres` int(11) DEFAULT NULL,
  `data_propera` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `manteniment` (
  `id_manteniment` int(11) NOT NULL,
  `id_vehicle` int(11) NOT NULL,
  `data_manteniment` date NOT NULL,
  `tipus` varchar(100) NOT NULL,
  `descripcio` text DEFAULT NULL,
  `quilometres` int(11) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `manteniment` (`id_manteniment`, `id_vehicle`, `data_manteniment`, `tipus`, `descripcio`, `quilometres`, `cost`) VALUES
(1, 2, '2024-11-02', 'Revisión', 'Filtres i oli', 288000, 150.00),
(2, 3, '2025-01-10', 'Rodes', 'Canvi rodes del darrere', 10000, 400.00);

CREATE TABLE `recordatori` (
  `id_recordatori` int(11) NOT NULL,
  `id_usuari` int(11) NOT NULL,
  `titol` varchar(100) NOT NULL,
  `descripcio` text DEFAULT NULL,
  `data_recordatori` date NOT NULL,
  `estat` enum('pendent','completat') DEFAULT 'pendent'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


CREATE TABLE `reparacions` (
  `id_reparacio` int(11) NOT NULL,
  `id_vehicle` int(11) NOT NULL,
  `data_reparacio` date NOT NULL,
  `descripcio` text DEFAULT NULL,
  `taller` varchar(100) DEFAULT NULL,
  `quilometres` int(11) DEFAULT NULL,
  `cost` decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO `reparacions` (`id_reparacio`, `id_vehicle`, `data_reparacio`, `descripcio`, `taller`, `quilometres`, `cost`) VALUES
(1, 2, '2025-05-22', 'Alternador', 'Taller Bosch', 289000, 350.00);

CREATE TABLE `usuari` (
  `id_usuari` int(11) NOT NULL,
  `nom` varchar(100) NOT NULL,
  `cognoms` varchar(30) NOT NULL,
  `data_naixement` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `contrasenya` varchar(255) NOT NULL,
  `data_registre` date DEFAULT curdate(),
  `imatge_perfil` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `usuari` (`id_usuari`, `nom`, `cognoms`, `data_naixement`, `email`, `contrasenya`, `data_registre`, `imatge_perfil`) VALUES
(1, 'Aitor', 'Salido Puga', '2006-09-25', 'aisapu@inspalamos.cat', '$2y$10$4iI2Yd3A4mgrRl/WmpnfHu/SfAhmrvAIaYbUPTObMIIodaBz2Rpvu', '2025-11-05', 'img/aitor.png'),
(5, 'Jesús', 'Aldoman Ortiz', '2005-03-31', 'jealor@inspalamos.cat', '$2y$10$4APw6Gs5Z.QV8u09r6kxiuMhS9AGe2.J..2aQ/oY5eVZ68Fp4nMEC', '2026-01-29', NULL),
(16, 'q3243654657647536425341', '13254365476u57i5674563', '0211-02-05', '325461@g.c', '$2y$10$vlqagdwvw8t3EyxNmJG9p.Ht8BWHYVh7Mfv66WX6dHJYoJCyM5XEq', '2026-01-29', NULL),
(17, 'Jesús', 'Aldoman Ortiz', '0003-03-03', 'jsbjsj347@gmail.com', '$2y$10$KbT6O7Vt18JUPPFnSSGa0eixaW3/Eb3kZkWg65N6W10qiVVc7AOUy', '2026-01-29', NULL);


CREATE TABLE `vehicle` (
  `id_vehicle` int(11) NOT NULL,
  `id_usuari` int(11) NOT NULL,
  `marca` varchar(100) NOT NULL,
  `model` varchar(100) NOT NULL,
  `tipus_combustible` enum('Gasolina','Dièsel','Gas','Elèctric','Híbrid','Híbrid Endollable') NOT NULL,
  `any_fabricacio` int(11) DEFAULT NULL,
  `matricula` varchar(20) DEFAULT NULL,
  `color` varchar(50) DEFAULT NULL,
  `imatge` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;


INSERT INTO `vehicle` (`id_vehicle`, `id_usuari`, `marca`, `model`, `tipus_combustible`, `any_fabricacio`, `matricula`, `color`, `imatge`) VALUES
(1, 1, 'Volkswagen', 'Touareg R', 'Híbrid Endollable', 2021, '1234ABC', 'Negre', 'img/touareg_r.jpg'),
(2, 1, 'Volkswagen', 'Touareg 2.5 TDI', 'Dièsel', 2004, '5678XYZ', 'Gris', 'img/touareg_tdi.jpg'),
(3, 1, 'Tesla', 'Model 3', 'Elèctric', 2023, '9999ELEC', 'Blanc', 'img/tesla.jpg');


CREATE VIEW `ranking_consum_termic` AS
SELECT 
    v.id_vehicle, v.marca, v.model, v.matricula, v.tipus_combustible,
    COUNT(c.id_consum) as repostatges,
    ROUND(AVG(c.litres), 2) as mitjana_litres_repostatge,
    ROUND(AVG(c.consum_mitja_obc), 2) as mitjana_l_100km
FROM `vehicle` v
JOIN `consum` c ON v.id_vehicle = c.id_vehicle
WHERE v.tipus_combustible IN ('Gasolina', 'Dièsel', 'Gas')
GROUP BY v.id_vehicle
ORDER BY mitjana_l_100km ASC;

CREATE VIEW `ranking_consum_electric` AS
SELECT 
    v.id_vehicle, v.marca, v.model, v.matricula, v.tipus_combustible,
    COUNT(c.id_consum) as recargues,
    ROUND(AVG(c.kwh), 2) as mitjana_kwh_recarga,
    ROUND(AVG(c.consum_mitja_obc), 2) as mitjana_kwh_100km
FROM `vehicle` v
JOIN `consum` c ON v.id_vehicle = c.id_vehicle
WHERE v.tipus_combustible = 'Elèctric'
GROUP BY v.id_vehicle
ORDER BY mitjana_kwh_100km ASC;

CREATE VIEW `ranking_consum_hibrid` AS
SELECT 
    v.id_vehicle, v.marca, v.model, v.matricula, v.tipus_combustible,
    COUNT(c.id_consum) as registres,
    ROUND(AVG(c.litres), 2) as mitjana_litres,
    ROUND(AVG(c.kwh), 2) as mitjana_kwh,
    ROUND(AVG(c.consum_mitja_obc), 2) as consum_global_ref
FROM `vehicle` v
JOIN `consum` c ON v.id_vehicle = c.id_vehicle
WHERE v.tipus_combustible IN ('Híbrid', 'Híbrid Endollable')
GROUP BY v.id_vehicle
ORDER BY consum_global_ref ASC;

CREATE VIEW `ranking_gastos_manteniment` AS
SELECT 
    v.id_vehicle, v.marca, v.model, v.tipus_combustible,
    COUNT(m.id_manteniment) as total_intervencions,
    IFNULL(SUM(m.cost), 0) as cost_total_manteniment
FROM `vehicle` v
LEFT JOIN `manteniment` m ON v.id_vehicle = m.id_vehicle
GROUP BY v.id_vehicle
ORDER BY cost_total_manteniment ASC;

CREATE VIEW `ranking_gastos_reparacions` AS
SELECT 
    v.id_vehicle, v.marca, v.model, v.tipus_combustible,
    COUNT(r.id_reparacio) as total_averies,
    IFNULL(SUM(r.cost), 0) as cost_total_reparacions
FROM `vehicle` v
LEFT JOIN `reparacions` r ON v.id_vehicle = r.id_vehicle
GROUP BY v.id_vehicle
ORDER BY cost_total_reparacions ASC;


ALTER TABLE `consum`  ADD PRIMARY KEY (`id_consum`), ADD KEY `id_vehicle` (`id_vehicle`);
ALTER TABLE `forum`  ADD PRIMARY KEY (`id_post`), ADD KEY `id_usuari` (`id_usuari`), ADD KEY `forum_ibfk_2` (`id_vehicle`);
ALTER TABLE `itv`  ADD PRIMARY KEY (`id_itv`), ADD KEY `id_vehicle` (`id_vehicle`);
ALTER TABLE `manteniment`  ADD PRIMARY KEY (`id_manteniment`), ADD KEY `id_vehicle` (`id_vehicle`);
ALTER TABLE `recordatori`  ADD PRIMARY KEY (`id_recordatori`), ADD KEY `id_usuari` (`id_usuari`);
ALTER TABLE `reparacions`  ADD PRIMARY KEY (`id_reparacio`), ADD KEY `id_vehicle` (`id_vehicle`);
ALTER TABLE `usuari`  ADD PRIMARY KEY (`id_usuari`), ADD UNIQUE KEY `email` (`email`);
ALTER TABLE `vehicle`  ADD PRIMARY KEY (`id_vehicle`), ADD UNIQUE KEY `matricula` (`matricula`), ADD KEY `id_usuari` (`id_usuari`);

ALTER TABLE `consum`  MODIFY `id_consum` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
ALTER TABLE `forum`  MODIFY `id_post` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `itv`  MODIFY `id_itv` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `manteniment`  MODIFY `id_manteniment` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
ALTER TABLE `recordatori`  MODIFY `id_recordatori` int(11) NOT NULL AUTO_INCREMENT;
ALTER TABLE `reparacions`  MODIFY `id_reparacio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
ALTER TABLE `usuari`  MODIFY `id_usuari` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;
ALTER TABLE `vehicle`  MODIFY `id_vehicle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

ALTER TABLE `consum`  ADD CONSTRAINT `consum_ibfk_1` FOREIGN KEY (`id_vehicle`) REFERENCES `vehicle` (`id_vehicle`) ON DELETE CASCADE;
ALTER TABLE `forum`  ADD CONSTRAINT `forum_ibfk_1` FOREIGN KEY (`id_usuari`) REFERENCES `usuari` (`id_usuari`) ON DELETE CASCADE,  ADD CONSTRAINT `forum_ibfk_2` FOREIGN KEY (`id_vehicle`) REFERENCES `vehicle` (`id_vehicle`) ON DELETE SET NULL;
ALTER TABLE `itv`  ADD CONSTRAINT `itv_ibfk_1` FOREIGN KEY (`id_vehicle`) REFERENCES `vehicle` (`id_vehicle`) ON DELETE CASCADE;
ALTER TABLE `manteniment`  ADD CONSTRAINT `manteniment_ibfk_1` FOREIGN KEY (`id_vehicle`) REFERENCES `vehicle` (`id_vehicle`) ON DELETE CASCADE;
ALTER TABLE `recordatori`  ADD CONSTRAINT `recordatori_ibfk_1` FOREIGN KEY (`id_usuari`) REFERENCES `usuari` (`id_usuari`) ON DELETE CASCADE;
ALTER TABLE `reparacions`  ADD CONSTRAINT `reparacions_ibfk_1` FOREIGN KEY (`id_vehicle`) REFERENCES `vehicle` (`id_vehicle`) ON DELETE CASCADE;
ALTER TABLE `vehicle`  ADD CONSTRAINT `vehicle_ibfk_1` FOREIGN KEY (`id_usuari`) REFERENCES `usuari` (`id_usuari`) ON DELETE CASCADE;
COMMIT;