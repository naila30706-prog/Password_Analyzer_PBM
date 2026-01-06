let currentKey = "";
let keyVisible = false;

/* ENCRYPT AES-256-CBC */
function encryptPassword(password) {

    const KEY = CryptoJS.lib.WordArray.random(32);
    const IV  = CryptoJS.lib.WordArray.random(16);

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

/* PASSWORD STRENGTH CHECK */
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

/* FORM SUBMIT */
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
        result.ciphertext + "\n" + result.iv;

    currentKey = result.key;
    keyVisible = false;

    document.getElementById("keyDisplay").textContent =
        "••••••••••••••••••••••••••";

    document.getElementById("toggleKey").textContent = "Show";
    document.getElementById("encryptedBox").style.display = "block";
});

/* TOGGLE PASSWORD */
document.getElementById("togglePassword").addEventListener("click", () => {
    const input = document.getElementById("password");
    const toggle = document.getElementById("togglePassword");

    input.type = input.type === "password" ? "text" : "password";
    toggle.textContent = input.type === "password" ? "Show" : "Hide";
});

/* TOGGLE KEY */
document.getElementById("toggleKey").addEventListener("click", () => {
    keyVisible = !keyVisible;

    document.getElementById("keyDisplay").textContent =
        keyVisible ? currentKey : "••••••••••••••••••••••••••";

    document.getElementById("toggleKey").textContent =
        keyVisible ? "Hide" : "Show";
});
