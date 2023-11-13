document.addEventListener("DOMContentLoaded", function () {

    const logout = document.getElementById("logout");
    logout.addEventListener("click", () => {
        window.location.href = `index.html`;
    });


    const btn_fem = document.getElementById("btn_masc");
    const btn_masc = document.getElementById("btn_fem");
    const btn_all = document.getElementById("btn_all");
    btn_fem.addEventListener("click", () => carregarJogadores("masculino"));
    btn_masc.addEventListener("click", () => carregarJogadores("feminino"));
    btn_all.addEventListener("click", () => carregarJogadores("all"));

    const selectEscolhas = document.getElementById("select-escolhas");
    selectEscolhas.addEventListener("change", function () {
        const generoSelecionado = this.value;
        carregarJogadores(generoSelecionado);
    });


function carregarJogadores(genero){
    const containerElenco = document.getElementById("elenco");
    containerElenco.innerHTML = '';

    fetch(`https://botafogo-atletas.mange.li/${genero}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(atleta => {

            const cartaoAtleta = document.createElement('div');
            cartaoAtleta.className = 'atleta-cartao';
            cartaoAtleta.style.width = 'min-content';
            cartaoAtleta.style.margin = 'auto';
            cartaoAtleta.style.padding = '16px';
            cartaoAtleta.style.backgroundColor = 'grey';
            cartaoAtleta.style.cursor = 'pointer';
            cartaoAtleta.style.borderRadius = '3px';
            cartaoAtleta.addEventListener('click', () => {
                window.location.href = `detalhes.html?id=${atleta.id}`;
           });

            const imagemAtleta = document.createElement('img');
            imagemAtleta.className = 'atleta-img';
            imagemAtleta.src = atleta.imagem;

            const detalhesAtleta = document.createElement('div');
            detalhesAtleta.className = 'atleta-detalhes';
            detalhesAtleta.innerHTML = ` 
                <p class="nome-atleta" style="color:black; font-family: Alumni Sans Inline One, sans-serif; font-size: 28px; letter-spacing: .5px; margin: 10px;">${atleta.nome}</p> 
                <p class="saiba-mais" style="color:black; font-family: Alumni Sans Inline One, sans-serif; font-size: 20px; letter-spacing: .5px; background-color: white; padding: 10px; margin: 10px; border-radius: 3px;">Saiba mais</p>
            `;

            cartaoAtleta.appendChild(imagemAtleta);
            cartaoAtleta.appendChild(detalhesAtleta);

            containerElenco.appendChild(cartaoAtleta);

        });
    })
    .catch(error => {
        console.error(`Erro ao buscar elenco ${genero}:`, error);
    });
}
});
