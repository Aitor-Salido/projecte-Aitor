<?php

require __DIR__ . '/vendor/autoload.php';

// Crear cliente Resend
$resend = \Resend::client('re_Gr4k8Q6C_9W43CpYiMjcG4bsYZ52D9pfp');

try {
    // Enviar email
    $result = $resend->sendEmail([
        'from' => 'onboarding@resend.dev',
        'to' => 'aisapu@inspalamos.cat',
        'subject' => 'Hello World',
        'html' => '<p>Congrats on sending your <strong>first email</strong>!</p>',
    ]);

    // Comprobar y mostrar resultado
    if (isset($result->id)) {
        echo "✅ Email enviado correctamente. ID: " . $result->id . "\n";
    } else {
        echo "⚠️ Email enviado pero no se recibió ID. Objeto completo:\n";
        echo '<pre>';
        print_r($result);
        echo '</pre>';
    }

} catch (\Exception $e) {
    // Capturar cualquier error
    echo "❌ Error al enviar email: " . $e->getMessage();
}
