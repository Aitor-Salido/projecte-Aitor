<?php

require __DIR__ . '/vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable(__DIR__);
$dotenv->load();

$resend = \Resend::client($_ENV['RESEND_API_KEY']);

try {
    $result = $resend->emails->send([
        'from' => 'BoxSphere <info@boxsphere.daw2inspalamos.cat>',
        'to' => $email,
        'subject' => $subject,
        'html' => $html,
    ]);
} catch (\Exception $e) {
}