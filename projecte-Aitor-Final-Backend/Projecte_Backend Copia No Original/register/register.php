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

if (!isset($data['email'])) {
    echo json_encode(["error" => "Email no recibido"]);
    exit;
}

$contraEncriptada = password_hash($data['contra'], PASSWORD_DEFAULT);

$token = bin2hex(random_bytes(32));
$token_expirence = date("Y-m-d H:i:s", strtotime("+1 hour"));

$stmt = $conn->prepare("
    INSERT INTO usuari (
        nom,
        cognoms,
        data_naixement,
        email,
        contrasenya,
        data_registre,
        imatge_perfil,
        token_verify,
        token_expirence,
        token
    )
    SELECT ?, ?, ?, ?, ?, CURDATE(), NULL, FALSE, ?, ?
    FROM dual
    WHERE NOT EXISTS (
        SELECT 1 FROM usuari WHERE email = ?
    )
");

$stmt->bind_param(
    "ssssssss",
    $data['nom'],
    $data['cognoms'],
    $data['data_nei'],
    $data['email'],
    $contraEncriptada,
    $token_expirence,
    $token,
    $data['email']
);


if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {

        $email = $data['email'];
        $subject = "Verifica tu cuenta " . $data['nom'] . " " . $data['cognoms'];

        $html = "
<div style='padding: 40px 20px; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; text-align: center;'>
    
    <table align='center' border='0' cellpadding='0' cellspacing='0' width='100%' style='max-width: 550px; background-color: #1E202A; border: 1px solid #333333; border-radius: 20px; margin: 0 auto; box-shadow: 0 10px 30px rgba(0, 0, 0, 0.4);'>
        <tr>
            <td align='center' style='padding: 50px 40px;'>
                <img src='http://boxsphere.daw2inspalamos.cat/img/logo_Box.png' alt='Logo' style='width: 100px; height: 100px; margin-bottom: 20px;'>
                <h1 style='color: #ffffff; font-size: 28px; font-weight: 700; margin: 0 0 15px 0;'>
                    Bienvenido a BoxSphere " . htmlspecialchars($data['nom']) . " " . htmlspecialchars($data['cognoms']) . "
                </h1>
                
                <p style='color: #8b8d97; font-size: 16px; margin: 0 0 35px 0;'>
                    Haz clic para verificar tu cuenta:
                </p>
                
                <table border='0' cellpadding='0' cellspacing='0' style='margin: 0 auto;'>
                    <tr>
                        <td align='center' bgcolor='#3b82f6' style='border-radius: 9999px;'>
                            <a href='http://localhost:5173/verify_user?token=" . urlencode($token) . "' target='_blank' style='display: inline-block; padding: 14px 40px; font-family: -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Helvetica, Arial, sans-serif; font-size: 16px; color: #ffffff; text-decoration: none; font-weight: 600; border-radius: 9999px;'>
                                Verificar cuenta
                            </a>
                        </td>
                    </tr>
                </table>
                
            </td>
        </tr>
    </table>
    
</div>
";

        require __DIR__ . '/../emails/email.php';

        echo json_encode([
            "status" => "success",
            "mensaje" => "Usuario registrado correctamente."
        ]);
    } else {
        echo json_encode([
            "status" => "error",
            "mensaje" => "El correo electrónico ya está registrado."
        ]);
    }
} else {
    echo json_encode([
        "status" => "error",
        "mensaje" => "Error al ejecutar la inserción en la base de datos.",
        "debug" => $stmt->error
    ]);
}

