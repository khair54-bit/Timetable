<?php
header('Content-Type: application/json');
$file = 'db/data.json';

// Validate file existence and readability
if (!file_exists($file) || !is_readable($file)) {
    echo json_encode(['success' => false, 'error' => 'File not found or not readable']);
    exit;
}

// Ambil data JSON dari file
$data = json_decode(file_get_contents($file), true);

// Validate data
if (json_last_error() !== JSON_ERROR_NONE) {
    echo json_encode(['success' => false, 'error' => 'Invalid JSON data']);
    exit;
}

// ID yang dikirim melalui AJAX
$id = $_POST['row'];

// Validate ID
if (empty($id)) {
    echo json_encode(['success' => false, 'error' => 'ID is required']);
    exit;
}

// Hapus data berdasarkan ID
$data = array_filter($data, function ($entry) use ($id) {
    return $entry['id'] != $id;
});

// Tulis ulang file JSON
if (!file_put_contents($file, json_encode(array_values($data), JSON_PRETTY_PRINT))) {
    echo json_encode(['success' => false, 'error' => 'Failed to write to file']);
    exit;
}

// Kirim respons
echo json_encode(['success' => true]);