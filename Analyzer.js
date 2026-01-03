// ===============================
// PASSWORD HASHING (SHA-256)
// ===============================
function hashPassword(password) {
    // SHA-256 hashing
    const hash = CryptoJS.SHA256(password);
    return hash.toString(CryptoJS.enc.Hex);
}

// ===============================
// PASSWORD STRENGTH CHECK
// ===============================
function checkStrength(password) {
    let score = 0;
    let suggestions = [];

    // ===== CEK PANJANG PASSWORD =====
    if (password.length < 8) {
        suggestions.push("Password terlalu pendek (minimal 8 karakter)");
    } else if (password.length < 12) {
        suggestions.push("Panjang password cukup, disarankan 12 karakter atau lebih");
        score++;
    } else {
        score += 2;
    }

    // ===== HURUF BESAR =====
    if (!/[A-Z]/.test(password)) {
        suggestions.push("Tambahkan huruf besar");
    } else score++;

    // ===== HURUF KECIL =====
    if (!/[a-z]/.test(password)) {
        suggestions.push("Tambahkan huruf kecil");
    } else score++;

    // ===== ANGKA =====
    if (!/\d/.test(password)) {
        suggestions.push("Tambahkan angka");
    } else score++;

    // ===== SIMBOL =====
    if (!/[^a-zA-Z0-9]/.test(password)) {
        suggestions.push("Tambahkan simbol");
    } else score++;

    // ===== PASSWORD UMUM =====
    const common = [
        "123456",
        "password",
        "qwerty",
        "admin",
        "123456789",
        "qwerty123"
    ];

    if (common.includes(password.toLowerCase())) {
        suggestions.push("Jangan gunakan password yang umum");
        score = 0;
    }

    if (suggestions.length === 0) {
        suggestions.push("Password Anda sangat kuat!");
    }

    const strength = Math.floor((score / 7) * 100);
    return [strength, suggestions];
}

// ===============================
// MAIN EVENT
// ===============================
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("passwordForm");
    const passwordInput = document.getElementById("password");
    const togglePassword = document.getElementById("togglePassword");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const password = passwordInput.value;
        if (!password) return;

        const [strength, suggestions] = checkStrength(password);
        const hashedPassword = hashPassword(password);

        // Strength
        const strengthDisplay = document.getElementById("strengthDisplay");
        strengthDisplay.textContent = strength + "%";
        strengthDisplay.style.display = "block";

        // Suggestions
        const suggestionsList = document.getElementById("suggestionsList");
        suggestionsList.innerHTML = "";
        suggestions.forEach(text => {
            const li = document.createElement("li");
            li.textContent = text;
            suggestionsList.appendChild(li);
        });
        document.getElementById("suggestionsBox").style.display = "block";

        // Hashed output
        document.getElementById("encryptedText").value = hashedPassword;
        document.getElementById("encryptedBox").style.display = "block";
    });

    // TOGGLE PASSWORD VISIBILITY (SAFE)
    if (togglePassword && passwordInput) {
        togglePassword.addEventListener("click", () => {
            if (passwordInput.type === "password") {
                passwordInput.type = "text";
                togglePassword.textContent = "Hide";
            } else {
                passwordInput.type = "password";
                togglePassword.textContent = "Show";
            }
        });
    }
});
