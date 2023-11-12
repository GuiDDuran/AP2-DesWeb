function verificaSenha() {
    var senhaDigitada = document.getElementById('senha').value;
    var senhaHash = CryptoJS.MD5(senhaDigitada).toString();

    if (senhaHash === "85ee0fe4f155a9af2657d85054ad63ca") {
        window.location.href = "home.html";
    } else {
        alert("Senha incorreta!");
    }
}

function verificarTecla(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        verificaSenha();
    }
}