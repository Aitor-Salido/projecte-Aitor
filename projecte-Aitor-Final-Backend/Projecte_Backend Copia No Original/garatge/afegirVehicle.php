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

$idUsuari = $_SESSION['idUsuario'];

if (!isset($_FILES['imagen']) || $_FILES['imagen']['error'] !== UPLOAD_ERR_OK) {
    echo json_encode(["ok" => false, "error" => "Error en la pujada de la imatge"]);
    exit;
}

$archivo = $_FILES['imagen'];

if ($archivo['size'] > 5242880) {
    echo json_encode(["ok" => false, "error" => "La imatge supera el límit permès de 5MB."]);
    exit;
}

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mimeType = finfo_file($finfo, $archivo['tmp_name']);
finfo_close($finfo);

if (strpos($mimeType, 'image/') !== 0) {
    echo json_encode(["ok" => false, "error" => "La imatge no és vàlida."]);
    exit;
}

try {
    $upload = new UploadApi();
    $result = $upload->upload(
        $archivo['tmp_name'],
        [
            "folder" => "garages/user_$idUsuari",
            "type" => "authenticated",
            "use_filename" => true,
            "overwrite" => true
        ]
    );

    $public_id = $result['public_id'];

    $conn = new mysqli("127.0.0.1", "root", "", "garatge_virtual", 6001);

    if ($conn->connect_error) {
        throw new Exception("Error de connexió: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO vehicle (id_usuari, marca, model, tipus_combustible, matricula, color, any_fabricacio, publicar_ranking, imatge) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param(
        "issssssis",
        $idUsuari,
        $_POST['marca'],
        $_POST['model'],
        $_POST['tipus_combustible'],
        $_POST['matricula'],
        $_POST['color'],
        $_POST['any'],
        $_POST['publicar_ranking'],
        $public_id
    );

    if ($stmt->execute()) {
        echo json_encode([
            "ok" => true
        ]);
    } else {
        throw new Exception("Error al guardar en la BD: " . $stmt->error);
    }

} catch (Exception $e) {
    echo json_encode([
        "ok" => false,
        "error" => "Error de Servidor"
    ]);
}