/* HASHING */
function hashPassword(password) {
    const salt = CryptoJS.lib.WordArray.random(16);

    const hash = CryptoJS.PBKDF2(password, salt, {
        keySize: 256 / 32,
        iterations: 100000,
        hasher: CryptoJS.algo.SHA256
    });

    return {
        hash: CryptoJS.enc.Base64.stringify(hash),
        salt: CryptoJS.enc.Base64.stringify(salt)
    };
}

/* PASSWORD STRENGTH ANALYSIS */
function checkStrength(password) {
    let score = 0;
    let suggestions = [];

    if (password.length >= 8) score++; else suggestions.push("Minimal 8 karakter");
    if (/[A-Z]/.test(password)) score++; else suggestions.push("Tambahkan huruf besar");
    if (/[a-z]/.test(password)) score++; else suggestions.push("Tambahkan huruf kecil");
    if (/\d/.test(password)) score++; else suggestions.push("Tambahkan angka");
    if (/[^a-zA-Z0-9]/.test(password)) score++; else suggestions.push("Tambahkan simbol");

    const common = ["123456", "password", "admin", "qwerty", "123456789"];
    if (common.includes(password.toLowerCase())) {
        return [0, ["Jangan gunakan password umum"]];
    }

    if (suggestions.length === 0) suggestions.push("Password Anda sangat kuat!");
    return [Math.floor((score / 5) * 100), suggestions];
}

/* FORM HANDLER */
document.getElementById("passwordForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const [strength, suggestions] = checkStrength(password);
    const result = hashPassword(password);

    document.getElementById("strengthDisplay").textContent =
        "Kekuatan Password: " + strength + "%";
    document.getElementById("strengthDisplay").style.display = "block";

    const list = document.getElementById("suggestionsList");
    list.innerHTML = "";
    suggestions.forEach(s => {
        const li = document.createElement("li");
        li.textContent = s;
        list.appendChild(li);
    });
    document.getElementById("suggestionsBox").style.display = "block";

    document.getElementById("encryptedText").value =
        "Hash (Base64):\n" + result.hash + "\n\nSalt (Base64):\n" + result.salt;

    document.getElementById("encryptedBox").style.display = "block";
});

/* PASSWORD VISIBILITY */
document.getElementById("togglePassword").addEventListener("click", () => {
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
    document.getElementById("togglePassword").textContent =
        input.type === "password" ? "Show" : "Hide";
});
