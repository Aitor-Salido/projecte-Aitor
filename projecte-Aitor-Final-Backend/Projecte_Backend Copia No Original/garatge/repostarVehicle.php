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

if (!isset($_SESSION['idUsuario'])) {
    echo json_encode(["ok" => false, "error" => "No loguejat"]);
    exit;
}

$idUsuari = $_SESSION['idUsuario'];

try {
    $conn = new mysqli("127.0.0.1", "root", "", "garatge_virtual", 6001);

    if ($conn->connect_error) {
        throw new Exception("Error de connexió: " . $conn->connect_error);
    }

    $stmt = $conn->prepare("INSERT INTO consum (id_vehicle, data, litres, kwh, quilometres_recorreguts, cost_total, quilometres_actuals,consum_mitja_obc) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");

    $stmt->bind_param(
        "isddidid",
        $_POST['id_vehicle'],
        $_POST['data'],
        $_POST['litres'],
        $_POST['kwh'],
        $_POST['quilometres_recorreguts'],
        $_POST['cost_total'],
        $_POST['quilometres_actuals'],
        $_POST['consum_mitja']
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
        "error" => "Error de Servidor" . $e->getMessage()
    ]);
}