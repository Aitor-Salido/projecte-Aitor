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


$stmt = $conn->prepare("SELECT v.*, c.*
FROM vehicle v
LEFT JOIN consum c 
    ON v.id_vehicle = c.id_vehicle
    AND c.quilometres_actuals = (
        SELECT MAX(c2.quilometres_actuals)
        FROM consum c2
        WHERE c2.id_vehicle = v.id_vehicle
    )
WHERE v.id_usuari = ?;");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();

$result = $stmt->get_result();

$cotxes = [];

while ($row = $result->fetch_assoc()) {
    $cotxes[] = $row;
}

echo json_encode($cotxes);
?>