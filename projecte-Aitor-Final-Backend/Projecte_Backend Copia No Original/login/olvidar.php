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
    echo json_encode(["mensaje" => "Error de conexión", "valor" => false]);
    exit;
}

$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['email'])) {
    echo json_encode(["mensaje" => "Email no recibido", "valor" => false]);
    exit;
}

$token_contra = bin2hex(random_bytes(32));
$token_expirence_contra = date("Y-m-d H:i:s", strtotime("+1 hour"));

$stmt = $conn->prepare("
    UPDATE usuari SET 
        token_contra = ?,
        token_expirence_contra = ?
    WHERE email = ? AND token_verify = TRUE AND token_contra IS NULL
");

$stmt->bind_param(
    "sss",
    $token_contra,
    $token_expirence_contra,
    $data['email']
);


if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {

        $email = $data['email'];
        $subject = "Recuperar contraseña";

        $html = "
        <h1>Recuperar contraseña</h1>
        <p>Haz clic para recuperar tu contraseña:</p>
        <a href='http://localhost:5173/reset_password?token=$token_contra'>Recuperar contraseña</a>
    ";

        require __DIR__ . '/../emails/email.php';

        echo json_encode([
            "mensaje" => "Correo enviado correctamente.",
            "valor" => true
        ]);
    } else {
        echo json_encode([
            "mensaje" => "El correo electrónico no está registrado o ya tiene una solicitud de recuperación pendiente.",
            "valor" => false
        ]);
    }
} else {
    echo json_encode([
        "mensaje" => "Error al enviar el correo.",
        "valor" => false
    ]);
}