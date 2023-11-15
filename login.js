function verificaSenha() {

    const entrada = document.getElementById('campo_senha').value;
    const senha = CryptoJS.MD5(entrada).toString();

    if (senha === "85ee0fe4f155a9af2657d85054ad63ca") {
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