<?php
// Kết nối cơ sở dữ liệu
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'ecommercedb';

// Kết nối với cơ sở dữ liệu
$conn = new mysqli($host, $user, $password, $dbname);

// Kiểm tra kết nối
if ($conn->connect_error) {
    die("Kết nối thất bại: " . $conn->connect_error);
}

// Biến lưu trữ thông báo
$message = '';

// Xử lý khi người dùng gửi form
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];

    // Kiểm tra mật khẩu có khớp không
    if ($password !== $repassword) {
        $message = "Passwords do not match!";
    } else {
        // Mã hóa mật khẩu
        $hashed_password = password_hash($password, PASSWORD_DEFAULT);

        // Kiểm tra xem email đã tồn tại chưa
        $sql_check = "SELECT * FROM users WHERE email = ?";
        $stmt_check = $conn->prepare($sql_check);
        $stmt_check->bind_param("s", $email);
        $stmt_check->execute();
        $result_check = $stmt_check->get_result();

        if ($result_check->num_rows > 0) {
            $message = "Email already exists! Please use another email.";
        } else {
            // Thêm người dùng mới vào cơ sở dữ liệu
            $sql = "INSERT INTO users (email, password, role) VALUES (?, ?, 'user')";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("ss", $email, $hashed_password);

            if ($stmt->execute()) {
                $message = "Registration successful! Redirecting to login...";
                header("Location: ../login/login.php");
 
            } else {
                $message = "Error during registration. Please try again later.";
            }
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css">
</head>

<body>
    <div class="container-fluid d-flex justify-content-center align-items-center min-vh-100">
        <div class="bg-light p-5 shadow rounded">
            <h1 class="text-center mb-4">SIGN UP</h1>

            <!-- Hiển thị thông báo -->
            <?php if (!empty($message)) : ?>
                <div class="alert alert-info text-center">
                    <?php echo $message; ?>
                </div>
            <?php endif; ?>

            <!-- Form đăng ký -->
            <form method="POST" action="register.php">
                <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                        <input type="email" name="email" id="form3Example3c" class="form-control email"
                            placeholder="Enter your email" required />
                    </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                        <input type="password" name="password" id="form3Example4c" class="form-control password"
                            placeholder="Enter your password" required />
                    </div>
                </div>

                <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div class="form-outline flex-fill mb-0">
                        <input type="password" name="repassword" id="form3Example4cd" class="form-control repassword"
                            placeholder="Repeat your password" required />
                    </div>
                </div>

                <div class="form-check d-flex justify-content-center mb-5">
                    <input class="form-check-input me-2" type="checkbox" value="" id="form2Example3c" required />
                    <label class="form-check-label" for="form2Example3c">
                        I agree all statements in <a href="#!">Terms of service</a>
                    </label>
                </div>

                <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                <a href="../login/login.php" class="btn btn-primary btn-lg me-3">Login</a>

                <button type="submit" class="btn btn-primary btn-lg ">Register</button>
                </div>
            </form>
        </div>
    </div>
</body>

</html>
