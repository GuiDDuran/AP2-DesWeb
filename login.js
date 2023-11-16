function verificaSenha() {

    const entrada = document.getElementById('campo_senha').value;
    const senha = CryptoJS.MD5(entrada).toString();

    if (senha === "67dc411435f0b276521abd207cfa2b41") {
        localStorage.setItem('autenticado', 'true');
        window.location.href = "home.html";
    } else {
        alert("Senha incorreta!");
    }
}

function verificaTecla(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        verificaSenha();
    }
}