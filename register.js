const form = document.getElementById('registrationForm');
const passwordField = document.getElementById('password');
const message = document.getElementById('message');

function togglePassword() {
    passwordField.type = passwordField.type === "password" ? "text" : "password";
}

form.addEventListener('submit', function(e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = passwordField.value;

    if (password.length < 8) {
        message.style.color = "red";
        message.textContent = "Пароль должен содержать минимум 8 символов.";
        return;
    }

    const user = { name, email, phone, password };
    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.find(u => u.email === email)) {
        message.style.color = "red";
        message.textContent = "Пользователь с таким email уже существует.";
        return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUser", JSON.stringify(user));

    message.style.color = "lightgreen";
    message.textContent = "Аккаунт успешно создан!";
    form.reset();
});

function logout() {
    localStorage.removeItem("currentUser");
    alert("Вы вышли из аккаунта.");
    window.location.href = "index.html";
}

function togglePassword() {
    const eyeIcon = document.getElementById("eyeIcon");
    if (passwordField.type === "password") {
        passwordField.type = "text";
        eyeIcon.classList.remove("bi-eye-fill");
        eyeIcon.classList.add("bi-eye-slash-fill");
    } else {
        passwordField.type = "password";
        eyeIcon.classList.remove("bi-eye-slash-fill");
        eyeIcon.classList.add("bi-eye-fill");
    }
}
