<?php
session_start();
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Credentials: true");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, OPTIONS");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS')
    exit;

require __DIR__ . '/vendor/autoload.php';

use Cloudinary\Configuration\Configuration;
use Cloudinary\Asset\Image;

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

Configuration::instance([
    'cloud' => [
        'cloud_name' => $_ENV['CLOUDINARY_CLOUD_NAME'],
        'api_key' => $_ENV['CLOUDINARY_API_KEY'],
        'api_secret' => $_ENV['CLOUDINARY_API_SECRET'],
    ],
    'url' => [
        'secure' => true
    ]
]);

$conn = new mysqli("127.0.0.1", "root", "", "garatge_virtual", 6001);
$conn->set_charset("utf8mb4");

if (!isset($_SESSION['idUsuario'])) {
    echo json_encode([]);
    exit;
}

$idUsuari = $_SESSION['idUsuario'];

$stmt = $conn->prepare("SELECT v.*, c.consum_mitja_obc,c.litres,c.kwh,c.quilometres_actuals FROM vehicle v LEFT JOIN consum c ON v.id_vehicle = c.id_vehicle AND c.id_consum = (SELECT MAX(id_consum) FROM consum WHERE id_vehicle = v.id_vehicle) WHERE v.id_usuari = ?;");
$stmt->bind_param("i", $idUsuari);
$stmt->execute();
$result = $stmt->get_result();

$cotxes = [];

while ($row = $result->fetch_assoc()) {
    if (!empty($row['imatge'])) {

        $cleanPublicId = trim($row['imatge']);

        $img = new Image($cleanPublicId);

        $img->deliveryType("authenticated")
            ->signUrl(true)
            ->addTransformation("f_auto,q_auto,w_800,c_limit");

        $row['imatge'] = (string) $img->toUrl();
    } else {
        $row['imatge'] = "https://via.placeholder.com/400x250?text=Sense+Imatge";
    }
    $cotxes[] = $row;
}

echo json_encode($cotxes);