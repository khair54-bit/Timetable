<?php
header('Content-Type: application/json');
// Validasi input
if (!isset($_POST['row'], $_POST['column'], $_POST['value'])) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Input tidak lengkap']);
    exit;
}

// Konversi input ke tipe data yang sesuai
$id = intval($_POST['row']);
$column = trim($_POST['column']);
$value = trim($_POST['value']);
$newData = [$column => $value];

// Baca file JSON
$jsonFile = 'db/data.json';
if (!file_exists($jsonFile)) {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'File JSON tidak ditemukan']);
    exit;
}

$jsonData = json_decode(file_get_contents($jsonFile), true);
if ($jsonData === null) {
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Gagal membaca file JSON']);
    exit;
}

// Perulangan untuk mencari data berdasarkan ID
$isUpdated = false;
foreach ($jsonData as $key => $item) {
    if ($item['id'] == $id) {
        // Mengupdate data
        $jsonData[$key] = array_merge($item, $newData);
        $isUpdated = true;
        break;
    }
}

// Cek apakah data diperbarui
if ($isUpdated) {
    // Simpan kembali ke file JSON
    if (!file_put_contents($jsonFile, json_encode($jsonData, JSON_PRETTY_PRINT))) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Gagal menyimpan data ke file JSON']);
    } else {
        http_response_code(200);
        echo json_encode(['success' => true]);
    }
} else {
    http_response_code(404);
    echo json_encode(['success' => false, 'message' => 'Data tidak ditemukan']);
}