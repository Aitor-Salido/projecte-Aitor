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


$stmt = $conn->prepare("SELECT 
    m.id_manteniment,
    v.marca,
    v.model,
    v.matricula,
    m.tipus AS tipus_manteniment,
    m.descripcio AS descripcio_manteniment,
    m.data_manteniment,
    m.cost
FROM vehicle v
INNER JOIN manteniment m ON v.id_vehicle = m.id_vehicle
WHERE v.id_usuari = ?
ORDER BY v.model, m.data_manteniment;");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();

$result = $stmt->get_result();

$manteniments = [];

while ($row = $result->fetch_assoc()) {
    $manteniments[] = $row;
}

echo json_encode($manteniments);
?>