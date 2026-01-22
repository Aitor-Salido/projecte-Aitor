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

$contraEncriptada = password_hash($data['contra'], PASSWORD_DEFAULT);

$stmt = $conn->prepare("
    INSERT INTO usuari (
        nom,
        cognoms,
        data_naixement,
        email,
        contrasenya,
        data_registre,
        imatge_perfil
    )
    SELECT ?, ?, ?, ?, ?, CURDATE(), NULL
    FROM dual
    WHERE NOT EXISTS (
        SELECT 1 FROM usuari WHERE email = ?
    )
");

$stmt->bind_param(
    "ssssss",
    $data['nom'],
    $data['cognoms'],
    $data['data_nei'],
    $data['email'],
    $contraEncriptada,
    $data['email']
);

$stmt->execute();


// $result = $stmt->get_result();

// if ($result->num_rows === 0) {
//     echo json_encode(["mensaje" => "Usuario no encontrado", "valor" => false]);
// } else {
//     $fila = $result->fetch_assoc();
//     $contraEncriptada = $fila['contrasenya'];
//     $contraDesencriptada = $data['contra'];

//     if (password_verify($contraDesencriptada, $contraEncriptada)) {
//         echo json_encode(["mensaje" => "Usuario Logeado", "valor" => true]);
//     } else {
//         echo json_encode(["mensaje" => "Contrasenya incorrecta", "valor" => false]);
//     }
// }
