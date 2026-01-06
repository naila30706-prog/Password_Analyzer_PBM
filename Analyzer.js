// GENERATE RANDOM KEY & IV
const KEY = CryptoJS.lib.WordArray.random(32); // AES-256
const IV  = CryptoJS.lib.WordArray.random(16); // CBC IV

// ENCRYPT PASSWORD (AES-256-CBC)
function encryptPassword(password) {
    const encrypted = CryptoJS.AES.encrypt(password, KEY, {
        iv: IV,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    const ivCiphertext = IV.clone().concat(encrypted.ciphertext);

    return {
        encrypted: CryptoJS.enc.Base64.stringify(ivCiphertext),
        key: CryptoJS.enc.Base64.stringify(KEY)
    };
}

// PASSWORD STRENGTH CHECK
function checkStrength(password) {
    let score = 0;
    let suggestions = [];

    if (password.length >= 8) score++;
    else suggestions.push("Minimal 8 karakter");

    if (/[A-Z]/.test(password)) score++;
    else suggestions.push("Tambahkan huruf besar");

    if (/[a-z]/.test(password)) score++;
    else suggestions.push("Tambahkan huruf kecil");

    if (/\d/.test(password)) score++;
    else suggestions.push("Tambahkan angka");

    if (/[^a-zA-Z0-9]/.test(password)) score++;
    else suggestions.push("Tambahkan simbol");

    const common = [
        "123456", "password", "admin", "qwerty", "123456789"
    ];

    if (common.includes(password.toLowerCase())) {
        score = 0;
        suggestions = ["Jangan gunakan password umum"];
    }

    if (suggestions.length === 0) {
        suggestions.push("Password Anda sangat kuat!");
    }

    const strength = Math.floor((score / 5) * 100);
    return [strength, suggestions];
}

// MAIN EVENT
document.getElementById("passwordForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("password").value;

    const [strength, suggestions] = checkStrength(password);
    const result = encryptPassword(password);

    // Strength
    const strengthDisplay = document.getElementById("strengthDisplay");
    strengthDisplay.textContent = "Kekuatan Password: " + strength + "%";
    strengthDisplay.style.display = "block";

    // Suggestions
    const list = document.getElementById("suggestionsList");
    list.innerHTML = "";
    suggestions.forEach(s => {
        const li = document.createElement("li");
        li.textContent = s;
        list.appendChild(li);
    });
    document.getElementById("suggestionsBox").style.display = "block";

    // Encrypted output
    document.getElementById("encryptedText").value = result.encrypted;
    document.getElementById("keyDisplay").textContent = result.key;
    document.getElementById("encryptedBox").style.display = "block";
});

// TOGGLE SHOW / HIDE PASSWORD
document.getElementById("togglePassword").addEventListener("click", () => {
    const input = document.getElementById("password");
    const toggle = document.getElementById("togglePassword");

    if (input.type === "password") {
        input.type = "text";
        toggle.textContent = "Hide";
    } else {
        input.type = "password";
        toggle.textContent = "Show";
    }
});
