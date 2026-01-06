// GENERATE RANDOM KEY & IV
let KEY = CryptoJS.lib.WordArray.random(32); // AES-256
let IV = CryptoJS.lib.WordArray.random(16);  // CBC IV

// ENCRYPT PASSWORD (AES-256-CBC)
function encryptPassword(password) {
    const encrypted = CryptoJS.AES.encrypt(password, KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const ivCiphertext = IV.concat(encrypted.ciphertext);
    const encryptedB64 = CryptoJS.enc.Base64.stringify(ivCiphertext);
    const keyB64 = CryptoJS.enc.Base64.stringify(KEY);

    return [encryptedB64, keyB64];
}

// PASSWORD STRENGTH CHECK
function checkStrength(password) {
    let score = 0;
    let suggestions = [];

    if (password.length < 8) {
        suggestions.push("Minimal 8 karakter");
    } else score++;

    if (!/[A-Z]/.test(password)) {
        suggestions.push("Tambahkan huruf besar");
    } else score++;

    if (!/[a-z]/.test(password)) {
        suggestions.push("Tambahkan huruf kecil");
    } else score++;

    if (!/\d/.test(password)) {
        suggestions.push("Tambahkan angka");
    } else score++;

    if (!/[^a-zA-Z0-9]/.test(password)) {
        suggestions.push("Tambahkan simbol");
    } else score++;

    const common = [
        '123456',
        'qwerty',
        'password',
        'admin',
        '123456789',
        'qwerty123'
    ];

    if (common.includes(password.toLowerCase())) {
        suggestions.push("Jangan gunakan password umum");
        score = 0;
    }

    if (suggestions.length === 0) {
        suggestions = ["Password Anda sangat kuat!"];
    }

    const strength = Math.floor((score / 5) * 100);
    return [strength, suggestions];
}

// MAIN EVENT HANDLER
document.addEventListener("DOMContentLoaded", () => {

    // SUBMIT FORM
    document.getElementById("passwordForm").addEventListener("submit", function (e) {
        e.preventDefault();

        const password = document.getElementById("password").value;
        if (!password) return;

        const [strength, suggestions] = checkStrength(password);
        const [encrypted, keyDisplay] = encryptPassword(password);

        // Show strength
        const strengthDisplay = document.getElementById("strengthDisplay");
        strengthDisplay.textContent = strength + "%";
        strengthDisplay.style.display = "block";

        // Show suggestions
        const suggestionsList = document.getElementById("suggestionsList");
        suggestionsList.innerHTML = "";
        suggestions.forEach(s => {
            const li = document.createElement("li");
            li.textContent = s;
            suggestionsList.appendChild(li);
        });
        document.getElementById("suggestionsBox").style.display = "block";

        // Show encrypted output
        document.getElementById("encryptedText").value = encrypted;
        document.getElementById("keyDisplay").textContent = keyDisplay;
        document.getElementById("encryptedBox").style.display = "block";
    });

    // TOGGLE TAMPILKAN / SEMBUNYIKAN PASSWORD (TEKS)
    const togglePassword = document.getElementById("togglePassword");
    const passwordInput = document.getElementById("password");

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
