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
    c.id_consum, 
    v.marca, 
    v.model, 
    v.matricula, 
    v.tipus_combustible, 
    c.consum_mitja_obc, 
    c.litres, 
    c.kwh, 
    c.quilometres_recorreguts, 
    c.quilometres_actuals, 
    c.data, 
    c.cost_total 
FROM vehicle v 
INNER JOIN consum c ON v.id_vehicle = c.id_vehicle 
WHERE v.id_usuari = ? 
ORDER BY c.data DESC");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();

$result = $stmt->get_result();

$consums = [];

while ($row = $result->fetch_assoc()) {
    $consums[] = $row;
}

echo json_encode($consums);
?>