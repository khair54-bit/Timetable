<?php
header('Content-Type: application/json');
$file = 'db/data.json';

// Ambil data JSON dari file
$data = json_decode(file_get_contents($file), true);

// Data baru dikirim melalui AJAX
$newData = [
    'id' => round(microtime(true) * 1000), // ID Timestamp
    'time' => $_POST['time'],
    'monday' => $_POST['monday'],
    'tuesday' => $_POST['tuesday'],
    'wednesday' => $_POST['wednesday'],
    'thursday' => $_POST['thursday'],
    'friday' => $_POST['friday']
];

// Tambahkan data baru ke array
$data[] = $newData;

// Tulis ulang file JSON
file_put_contents($file, json_encode($data));

// Kirim respons
echo json_encode(['success' => true, 'data' => $newData]);
