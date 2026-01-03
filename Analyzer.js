// ===============================
// GENERATE RANDOM KEY & IV
// ===============================
const KEY = CryptoJS.lib.WordArray.random(32); // 256-bit
const IV  = CryptoJS.lib.WordArray.random(16); // 128-bit

// ===============================
// ENCRYPT PASSWORD (AES-256-CBC)
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
    const ivCiphertext = IV.clone().concat(encrypted.ciphertext);

    // Encode Base64
    const encryptedB64 = CryptoJS.enc.Base64.stringify(ivCiphertext);

    // Tampilkan key (edukasi)
    const keyHex = KEY.toString(CryptoJS.enc.Hex);

    return [encryptedB64, keyHex];
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

    document.getElementById("passwordForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const password = document.getElementById("password").value;
        if (!password) return;

        const [strength, suggestions] = checkStrength(password);
        const [encrypted, keyDisplay] = encryptPassword(password);

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
        document.getElementById("keyDisplay").textContent = keyDisplay;
        document.getElementById("encryptedBox").style.display = "block";
    });

    // TOGGLE PASSWORD VISIBILITY
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

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
