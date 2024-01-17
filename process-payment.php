<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $content = file_get_contents("php://input");
    $decoded = json_decode($content, true);

    if (isset($decoded['txHash'])) {
        $txHash = $decoded['txHash'];
        // Burada veritabanına kaydetme işlemi yapabilirsiniz.
        // Şimdilik, basitçe bir dosyaya yazıyoruz.
        file_put_contents('payments.txt', $txHash . PHP_EOL, FILE_APPEND);
        echo "İşlem kaydedildi: " . $txHash;
    } else {
        echo "İşlem hash'i bulunamadı.";
    }
} else {
    echo "Geçersiz istek.";
}
?>
