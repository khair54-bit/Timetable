<?php
session_start(); // Memulai sesi

// Cek apakah pengguna sudah login
if (isset($_SESSION['username'])) {
    header('Location: ./'); // Arahkan ke halaman utama jika sudah login
    exit;
}

// Proses login
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = filter_var($_POST['user'], FILTER_SANITIZE_STRING);
    $password = filter_var($_POST['pass'], FILTER_SANITIZE_STRING);

    // Baca file JSON
    $file = 'system/db/user.json';
    $data = json_decode(file_get_contents($file), true);

    // Validasi pengguna
    foreach ($data as $user) {
        if ($user['username'] === $username && password_verify($password, $user['password'])) {
            $_SESSION['username'] = $username; // Simpan username di sesi
            header('Location: ./'); // Arahkan ke halaman utama
            exit;
        }
    }

    $error = "Username atau password salah!";
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha3/dist/css/bootstrap.min.css" rel="stylesheet">
</head>

<body>
    <div class="container mt-5">
        <h2 class="text-center">Login</h2>
        <?php if (isset($error)): ?>
            <div class="alert alert-danger" role="alert">
                <?php echo $error; ?>
            </div>
        <?php endif; ?>
        <form action="login.php" method="POST">
            <div class="mb-3">
                <label for="user" class="form-label">Username:</label>
                <input type="text" id="user" name="user" class="form-control" autocomplete="off" required>
            </div>
            <div class="mb-3">
                <label for="pass" class="form-label">Password:</label>
                <input type="password" id="pass" name="pass" class="form-control" autocomplete="off" required>
            </div>
            <button type="submit" class="btn btn-primary">Login</button>
        </form>
    </div>
</body>

</html>