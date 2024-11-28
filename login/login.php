<?php
// Kết nối cơ sở dữ liệu
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'ecommercedb';

$conn = new mysqli($host, $user, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Biến lưu trữ thông báo
$message = '';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Truy vấn kiểm tra tài khoản
    $sql = "SELECT * FROM users WHERE email = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("s", $email);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();

        // Kiểm tra mật khẩu
        if (password_verify($password, $user['password'])) {
            // Lưu thông tin vào session
            session_start();
            $_SESSION['email'] = $user['email'];
            $_SESSION['role'] = $user['role'];
            header("Location: ../homepage/index.html"); // Chuyển đến trang người dùng
            exit();
        } else {
            $message = "Incorrect password!";
        }
    } else {
        $message = "Email not found!";
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" rel="stylesheet">

</head>

<body>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div class="bg-white wra">
            <h1 class="text-center mb-4">SIGN IN</h1>

            <!-- Hiển thị thông báo -->
            <?php if (!empty($message)) : ?>
                <div class="alert alert-danger text-center">
                    <?php echo $message; ?>
                </div>
            <?php endif; ?>

            <!-- Form đăng nhập -->
            <form method="POST" action="login.php">
                <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="email" name="email" class="form-control username" placeholder="Enter your email" required />
                    </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                        <input type="password" name="password" class="form-control password" placeholder="Enter your password" required />
                    </div>
                </div>

                <div class="row mb-3">
                    <div class="col d-flex justify-content-between align-items-center">
                        <div class="form-check">
                            <input class="form-check-input" type="checkbox" value="" id="form2Example31" />
                            <label class="form-check-label" for="form2Example31" style="margin-right: 40px;"> Remember
                                me </label>
                        </div>
                        <a href="#!" class="text-decoration-none">Forgot password?</a>
                    </div>
                </div>

                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button type="submit" class="btn btn-primary btn-lg">Login</button>
                </div>

                <div class="text-center">
                    <p>Not a member? <a href="../register/register.php">Register</a></p>
                    <p>or sign up with:</p>
                    <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-facebook-f"></i>
                    </button>
                    <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-google"></i>
                    </button>
                    <button type="button" class="btn btn-link btn-floating mx-1">
                        <i class="fab fa-github"></i>
                    </button>
                </div>
            </form>
        </div>
    </div>
</body>

</html>
