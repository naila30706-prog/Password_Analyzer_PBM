/* =======================
   HASHING (PBKDF2 TANPA SALT)
   ======================= */
function hashPassword(password) {
    const hash = CryptoJS.PBKDF2(password, password, {
        keySize: 256 / 32,
        iterations: 100000,
        hasher: CryptoJS.algo.SHA256
    });

    return {
        hash: CryptoJS.enc.Base64.stringify(hash)
    };
}

/* =======================
   PASSWORD STRENGTH CHECK
   ======================= */
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

    if (suggestions.length === 0) {
        suggestions.push("Password Anda sangat kuat!");
    }

    return [Math.floor((score / 5) * 100), suggestions];
}

/* =======================
   FORM HANDLER
   ======================= */
document.getElementById("passwordForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const password = document.getElementById("password").value;
    const [strength, suggestions] = checkStrength(password);
    const result = hashPassword(password);

    /* Strength display */
    const strengthDisplay = document.getElementById("strengthDisplay");
    strengthDisplay.textContent = "Kekuatan Password: " + strength + "%";
    strengthDisplay.style.display = "block";

    /* Suggestions */
    const list = document.getElementById("suggestionsList");
    list.innerHTML = "";
    suggestions.forEach(text => {
        const li = document.createElement("li");
        li.textContent = text;
        list.appendChild(li);
    });
    document.getElementById("suggestionsBox").style.display = "block";

    /* OUTPUT HASH SAJA */
    document.getElementById("encryptedText").value = result.hash;
    document.getElementById("encryptedBox").style.display = "block";
});

/* =======================
   PASSWORD VISIBILITY
   ======================= */
document.getElementById("togglePassword").addEventListener("click", () => {
    const input = document.getElementById("password");
    input.type = input.type === "password" ? "text" : "password";
    document.getElementById("togglePassword").textContent =
        input.type === "password" ? "Show" : "Hide";
});
