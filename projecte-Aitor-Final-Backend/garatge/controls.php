<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$conn = @new mysqli("localhost:6001", "root", "", "garatge_virtual");
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

$idUsuari = $_SESSION['idUsuario'];


// CONSUMO MEDIO ESTE MES
$stmt = $conn->prepare("
SELECT ROUND(AVG(c.consum_mitja_obc),2)
FROM consum c
JOIN vehicle v ON c.id_vehicle = v.id_vehicle
WHERE v.id_usuari = ?
AND MONTH(c.data) = MONTH(CURDATE())
AND YEAR(c.data) = YEAR(CURDATE());
");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();
$stmt->bind_result($consum_mes);
$stmt->fetch();
$stmt->close();


// CONSUMO MEDIO MES PASADO
$stmt = $conn->prepare("
SELECT ROUND(AVG(c.consum_mitja_obc),2)
FROM consum c
JOIN vehicle v ON c.id_vehicle = v.id_vehicle
WHERE v.id_usuari = ?
AND MONTH(c.data) = MONTH(CURDATE() - INTERVAL 1 MONTH)
AND YEAR(c.data) = YEAR(CURDATE() - INTERVAL 1 MONTH)
");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();
$stmt->bind_result($consum_mes_passat);
$stmt->fetch();
$stmt->close();


// GASTO ESTE MES
$stmt = $conn->prepare("
SELECT ROUND(SUM(c.cost_total),2)
FROM consum c
JOIN vehicle v ON c.id_vehicle = v.id_vehicle
WHERE v.id_usuari = ?
AND MONTH(c.data) = MONTH(CURDATE())
AND YEAR(c.data) = YEAR(CURDATE())
");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();
$stmt->bind_result($gasto_mes);
$stmt->fetch();
$stmt->close();


// GASTO MES PASADO
$stmt = $conn->prepare("
SELECT ROUND(SUM(c.cost_total),2)
FROM consum c
JOIN vehicle v ON c.id_vehicle = v.id_vehicle
WHERE v.id_usuari = ?
AND MONTH(c.data) = MONTH(CURDATE() - INTERVAL 1 MONTH)
AND YEAR(c.data) = YEAR(CURDATE() - INTERVAL 1 MONTH)
");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();
$stmt->bind_result($gasto_mes_passat);
$stmt->fetch();
$stmt->close();


// KM ESTE MES
$stmt = $conn->prepare("
SELECT ROUND(SUM((c.litres*100)/c.consum_mitja_obc),0)
FROM consum c
JOIN vehicle v ON c.id_vehicle = v.id_vehicle
WHERE v.id_usuari = ?
AND MONTH(c.data) = MONTH(CURDATE())
AND YEAR(c.data) = YEAR(CURDATE())
");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();
$stmt->bind_result($km_mes);
$stmt->fetch();
$stmt->close();


// KM MES PASADO
$stmt = $conn->prepare("
SELECT ROUND(SUM((c.litres*100)/c.consum_mitja_obc),0)
FROM consum c
JOIN vehicle v ON c.id_vehicle = v.id_vehicle
WHERE v.id_usuari = ?
AND MONTH(c.data) = MONTH(CURDATE() - INTERVAL 1 MONTH)
AND YEAR(c.data) = YEAR(CURDATE() - INTERVAL 1 MONTH);
");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();
$stmt->bind_result($km_mes_passat);
$stmt->fetch();
$stmt->close();


// ULTIMO REPOSTAJE
$stmt = $conn->prepare("
SELECT MAX(c.data)
FROM consum c
JOIN vehicle v ON c.id_vehicle = v.id_vehicle
WHERE v.id_usuari = ?
");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();
$stmt->bind_result($ultim_repostatge);
$stmt->fetch();
$stmt->close();


// JSON FINAL
echo json_encode([
    "consum_mes" => (int) ($consum_mes ?? 0),
    "consum_mes_passat" => (int) ($consum_mes_passat ?? 0),
    "gasto_mes" => (int) ($gasto_mes ?? 0),
    "gasto_mes_passat" => (int) ($gasto_mes_passat ?? 0),
    "km_mes" => (int) ($km_mes ?? 0),
    "km_mes_passat" => (int) ($km_mes_passat ?? 0),
    "ultim_repostatge" => (int) ($ultim_repostatge ?? 0)
]);
?>