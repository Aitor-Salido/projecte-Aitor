<?php
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Credentials: true");

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

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['token'])) {
    echo json_encode(["mensaje" => "Token no recibido", "valor" => false]);
    exit;
}

$stmt = $conn->prepare("SELECT id_usuari FROM usuari WHERE token = ? AND token_expirence > NOW()");
$stmt->bind_param("s", $data['token']);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["mensaje" => "Token no encontrado", "valor" => false]);
} else {
    $fila = $result->fetch_assoc();
    $id_user = $fila['id_usuari'];

    $stmt = $conn->prepare("UPDATE usuari SET token_verify = TRUE, token = NULL, token_expirence = NULL WHERE id_usuari = ?");
    $stmt->bind_param("i", $id_user);
    $stmt->execute();

    echo json_encode([
        "mensaje" => "Usuario verificado correctamente",
        "valor" => true
    ]);
}
?>