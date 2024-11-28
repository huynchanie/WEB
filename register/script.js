function Register() {
    event.preventDefault();
    const emailField = document.getElementsByClassName('email')[0]
    const passwordField = document.getElementsByClassName('password')[0];
    const repasswordField = document.getElementsByClassName('repassword')[0];

    // Xóa thông báo lỗi cũ nếu có
    usernameField.setCustomValidity("");
    passwordField.setCustomValidity("");

    // Kiểm tra và đặt thông báo lỗi nếu cần
   

    if (!emailField.validity.valid) {
        emailField.setCustomValidity("Enter a valid email address");
        emailField.reportValidity();
        return;
    }

    if (!passwordField.value) {
        passwordField.setCustomValidity("Enter your password");
        passwordField.reportValidity();
        return;
    }

    if (passwordField.value.length < 8) {
        passwordField.setCustomValidity("Password must be at least 8 characters long");
        passwordField.reportValidity();
        return;
    }

    if (passwordField.value !== repasswordField.value) {
        repasswordField.setCustomValidity("Passwords do not match");
        repasswordField.reportValidity();
        return;
    }
    if (!repasswordField.value) {
        repasswordField.setCustomValidity("Repeat your password");
        repasswordField.reportValidity();
        return;
    }
   
}