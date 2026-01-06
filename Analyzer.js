let currentKey = "";
let currentIV  = "";
let keyVisible = false;

// ENCRYPT
function encryptPassword(password) {

    const KEY = CryptoJS.lib.WordArray.random(32); // 256-bit
    const IV  = CryptoJS.lib.WordArray.random(16); // 128-bit

    const encrypted = CryptoJS.AES.encrypt(
        password,
        KEY,
        {
            iv: IV,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    return {
        ciphertext: CryptoJS.enc.Base64.stringify(encrypted.ciphertext),
        key: CryptoJS.enc.Base64.stringify(KEY),
        iv: CryptoJS.enc.Base64.stringify(IV)
    };
}

//  DECRYPT 
function decryptPassword(ciphertextB64, keyB64, ivB64) {
    const key = CryptoJS.enc.Base64.parse(keyB64);
    const iv  = CryptoJS.enc.Base64.parse(ivB64);
    const ciphertext = CryptoJS.enc.Base64.parse(ciphertextB64);

    const decrypted = CryptoJS.AES.decrypt(
        { ciphertext: ciphertext },
        key,
        {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        }
    );

    return decrypted.toString(CryptoJS.enc.Utf8);
}

// PASSWORD STRENGTH
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

    const common = ["123456", "password", "admin", "qwerty", "123456789"];
    if (common.includes(password.toLowerCase())) {
        return [0, ["Jangan gunakan password umum"]];
    }

    if (suggestions.length === 0) {
        suggestions.push("Password Anda sangat kuat!");
    }

    return [Math.floor((score / 5) * 100), suggestions];
}

//  FORM SUBMIT 
document.getElementById("passwordForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const [strength, suggestions] = checkStrength(password);
    const result = encryptPassword(password);

    const strengthDisplay = document.getElementById("strengthDisplay");
    strengthDisplay.textContent = "Kekuatan Password: " + strength + "%";
    strengthDisplay.style.display = "block";

    const list = document.getElementById("suggestionsList");
    list.innerHTML = "";
    suggestions.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        list.appendChild(li);
    });
    document.getElementById("suggestionsBox").style.display = "block";

    document.getElementById("encryptedText").value =
        "Ciphertext:\n" + result.ciphertext +
        "\n\nIV:\n" + result.iv;

    currentKey = result.key;
    currentIV  = result.iv;
    keyVisible = false;

    document.getElementById("keyDisplay").textContent =
        "••••••••••••••••••••••••••";

    document.getElementById("toggleKey").textContent = "Show";
    document.getElementById("encryptedBox").style.display = "block";
});

//  TOGGLE PASSWORD
document.getElementById("togglePassword").addEventListener("click", () => {
    const input = document.getElementById("password");
    const toggle = document.getElementById("togglePassword");

    input.type = input.type === "password" ? "text" : "password";
    toggle.textContent = input.type === "password" ? "Show" : "Hide";
});

// TOGGLE KEY 
document.getElementById("toggleKey").addEventListener("click", () => {
    keyVisible = !keyVisible;

    document.getElementById("keyDisplay").textContent =
        keyVisible ? currentKey : "••••••••••••••••••••••••••";

    document.getElementById("toggleKey").textContent =
        keyVisible ? "Hide" : "Show";
});
