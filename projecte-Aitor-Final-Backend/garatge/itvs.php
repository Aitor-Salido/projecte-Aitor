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
    v.marca,
    v.model,
    v.matricula,
    i.id_itv,
    i.data_visita,
    i.resultat,
    i.observacions,
    i.quilometres,
    i.data_propera
FROM vehicle v
INNER JOIN itv i ON v.id_vehicle = i.id_vehicle
WHERE v.id_usuari = ?
ORDER BY v.model, i.data_visita;");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();

$result = $stmt->get_result();

$manteniments = [];

while ($row = $result->fetch_assoc()) {
    $manteniments[] = $row;
}

echo json_encode($manteniments);
?>