<?php
session_start();
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require __DIR__ . '/vendor/autoload.php';

use Cloudinary\Configuration\Configuration;
use Cloudinary\Api\Upload\UploadApi;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

Configuration::instance(sprintf(
    'cloudinary://%s:%s@%s?secure=true',
    $_ENV['CLOUDINARY_API_KEY'],
    $_ENV['CLOUDINARY_API_SECRET'],
    $_ENV['CLOUDINARY_CLOUD_NAME']
));

if (!isset($_SESSION['idUsuario'])) {
    echo json_encode(["ok" => false, "error" => "No loguejat"]);
    exit;
}

if (!isset($_POST['id_vehicle'])) {
    echo json_encode(["ok" => false, "error" => "No s'ha especificat cap vehicle"]);
    exit;
}

try {
    $conn = new mysqli("127.0.0.1", "root", "", "garatge_virtual", 6001);

    if ($conn->connect_error) {
        throw new Exception("Error de connexió");
    }

    $stmtSelect = $conn->prepare("SELECT imatge FROM vehicle WHERE id_vehicle = ? AND id_usuari = ?");
    $stmtSelect->bind_param("ii", $_POST['id_vehicle'], $_SESSION['idUsuario']);
    $stmtSelect->execute();
    $result = $stmtSelect->get_result();
    $vehicle = $result->fetch_assoc();

    if ($vehicle) {
        if (!empty($vehicle['imatge'])) {
            $upload = new UploadApi();
            $upload->destroy($vehicle['imatge'], [
                "type" => "authenticated"
            ]);
        }

        $stmtDelete = $conn->prepare("DELETE FROM vehicle WHERE id_vehicle = ?");
        $stmtDelete->bind_param("i", $_POST['id_vehicle']);

        if ($stmtDelete->execute()) {
            echo json_encode(["ok" => true]);
        } else {
            throw new Exception("Error al eliminar");
        }
    } else {
        echo json_encode(["ok" => false, "error" => "Vehicle no trobat"]);
    }

} catch (Exception $e) {
    echo json_encode([
        "ok" => false,
        "error" => "Error del Servidor"
    ]);
}