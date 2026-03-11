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
    r.id_reparacio,
    r.data_reparacio,
    r.descripcio,
    r.taller,
    r.quilometres,
    r.cost
FROM vehicle v
INNER JOIN reparacions r ON v.id_vehicle = r.id_vehicle
WHERE v.id_usuari = ?
ORDER BY v.model, r.data_reparacio;");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();

$result = $stmt->get_result();

$manteniments = [];

while ($row = $result->fetch_assoc()) {
    $manteniments[] = $row;
}

echo json_encode($manteniments);
?>