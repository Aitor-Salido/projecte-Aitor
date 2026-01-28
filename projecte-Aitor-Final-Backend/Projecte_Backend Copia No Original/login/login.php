<?php
session_set_cookie_params([
    'lifetime' => 0,
    'path' => '/',
    'domain' => '',
    'secure' => false,
    'httponly' => true,
    'samesite' => 'Lax'
]);

session_start();

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");

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

$stmt = $conn->prepare("SELECT contrasenya, id_usuari FROM usuari WHERE email = ?");
$stmt->bind_param("s", $data['email']);
$stmt->execute();

$result = $stmt->get_result();

if ($result->num_rows === 0) {
    echo json_encode(["mensaje" => "Usuario no encontrado", "valor" => false]);
} else {
    $fila = $result->fetch_assoc();
    $id_user = $fila['id_usuari'];
    $contraEncriptada = $fila['contrasenya'];
    $contraDesencriptada = $data['contra'];

    if (password_verify($contraDesencriptada, $contraEncriptada)) {
        $_SESSION['idUsuario'] = $id_user;

        echo json_encode([
            "mensaje" => "Usuario Logeado",
            "valor" => true,
            "id" => $id_user
        ]);
    } else {
        echo json_encode(["mensaje" => "Contrasenya incorrecta", "valor" => false]);
    }
}
?>