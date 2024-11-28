function Login(event) {
    event.preventDefault(); // Prevent form submission if there's an error
    const emailField = document.getElementsByClassName('username')[0];
    const passwordField = document.getElementsByClassName('password')[0];

    // Clear any previous error messages
    emailField.setCustomValidity("");
    passwordField.setCustomValidity("");

    // Check and set error messages if needed
    if (!emailField.value) {
        emailField.setCustomValidity("Please enter your email!");
        emailField.reportValidity();
        return;
    }

    if (!passwordField.value) {
        passwordField.setCustomValidity("Please enter your password!");
        passwordField.reportValidity();
        return;
    }

    // Add your login logic here
    alert("Login successful!"); // Placeholder for success message
}
