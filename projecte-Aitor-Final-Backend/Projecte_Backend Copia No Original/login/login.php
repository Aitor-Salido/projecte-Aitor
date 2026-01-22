<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$conn = new mysqli("localhost:6001", "root", "", "garatge_virtual");
$conn->set_charset("utf8mb4");

if ($conn->connect_error) {
    echo json_encode(["error" => "Error de conexión"]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'])) {
    echo json_encode(["error" => "Email no recibido"]);
    exit;
}

$stmt = $conn->prepare("SELECT contrasenya FROM usuari WHERE email = ?");
$stmt->bind_param("s", $data['email']);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["mensaje" => "Usuario no encontrado", "valor" => false]);
} else {
    $fila = $result->fetch_assoc();
    $contraEncriptada = $fila['contrasenya'];
    $contraDesencriptada = $data['contra'];

    if (password_verify($contraDesencriptada, $contraEncriptada)) {
        echo json_encode(["mensaje" => "Usuario Logeado", "valor" => true]);
    } else {
        echo json_encode(["mensaje" => "Contrasenya incorrecta", "valor" => false]);
    }



}
