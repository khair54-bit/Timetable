<?php
// Baca file JSON dan kirimkan sebagai respons
header('Content-Type: application/json');
$data = file_get_contents('db/data.json');

echo json_encode(['success' => true, 'data' => json_decode($data)]);