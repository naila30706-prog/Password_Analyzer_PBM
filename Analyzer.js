// ===============================
// GENERATE AES KEY & IV (DEMO)
// ===============================
const KEY = CryptoJS.lib.WordArray.random(32); // 256-bit key
const IV  = CryptoJS.lib.WordArray.random(16); // 128-bit IV

// ===============================
// AES-256-CBC ENCRYPT
// ===============================
function encryptPassword(password) {
    const encrypted = CryptoJS.AES.encrypt(
        password,
        KEY,
        {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    // Gabungkan IV + ciphertext
    const combined = IV.clone().concat(encrypted.ciphertext);

    // Encode ke Base64 agar bisa ditampilkan
    const encryptedBase64 = CryptoJS.enc.Base64.stringify(combined);

    // Key ditampilkan hanya untuk edukasi
    const keyHex = KEY.toString(CryptoJS.enc.Hex);

    return [encryptedBase64, keyHex];
}

// ===============================
// PASSWORD STRENGTH CHECK
// ===============================
function checkStrength(password) {
    let score = 0;
    let suggestions = [];

    if (password.length < 8) {
        suggestions.push("Password terlalu pendek (minimal 8 karakter)");
    } else if (password.length < 12) {
        suggestions.push("Disarankan panjang password ≥ 12 karakter");
        score++;
    } else {
        score += 2;
    }

    if (/[A-Z]/.test(password)) score++;
    else suggestions.push("Tambahkan huruf besar");

    if (/[a-z]/.test(password)) score++;
    else suggestions.push("Tambahkan huruf kecil");

    if (/\d/.test(password)) score++;
    else suggestions.push("Tambahkan angka");

    if (/[^a-zA-Z0-9]/.test(password)) score++;
    else suggestions.push("Tambahkan simbol");

    const common = ["123456", "password", "qwerty", "admin"];
    if (common.includes(password.toLowerCase())) {
        suggestions.push("Jangan gunakan password umum");
        score = 0;
    }

    if (suggestions.length === 0) {
        suggestions.push("Password sangat kuat!");
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
        const [encrypted, keyHex] = encryptPassword(password);

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

        // Encrypted output
        document.getElementById("encryptedText").value = encrypted;
        document.getElementById("keyDisplay").textContent = keyHex;
        document.getElementById("encryptedBox").style.display = "block";
    });

    // Toggle show / hide password
    togglePassword.addEventListener("click", () => {
        if (passwordInput.type === "password") {
            passwordInput.type = "text";
            togglePassword.textContent = "Hide";
        } else {
            passwordInput.type = "password";
            togglePassword.textContent = "Show";
        }
    });
});
