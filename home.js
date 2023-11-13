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


function carregarJogadores(genero){
    const containerElenco = document.getElementById("elenco");
    containerElenco.innerHTML = '';

    fetch(`https://botafogo-atletas.mange.li/${genero}`)
    .then(response => response.json())
    .then(data => {
        data.forEach(atleta => {

            const cartaoAtleta = document.createElement('div');
            cartaoAtleta.className = 'atleta-cartao';

            const imagemAtleta = document.createElement('img');
            imagemAtleta.className = 'atleta-img';
            imagemAtleta.src = atleta.imagem;
            imagemAtleta.addEventListener('click', () => {
                window.location.href = `detalhes.html?id=${atleta.id}`;
            });

            const detalhesAtleta = document.createElement('div');
            detalhesAtleta.className = 'atleta-detalhes';
            detalhesAtleta.innerHTML = ` 
                <p class="saiba-mais">Saiba mais</p>
                <p class="nome-atleta">${atleta.nome_completo}</p> 
            `;

            cartaoAtleta.appendChild(imagemAtleta);
            cartaoAtleta.appendChild(detalhesAtleta);

            //Torna possível o acesso á página de detalhes ao clicar em saiba mais ou no nome do atleta
            const saibaMais = detalhesAtleta.querySelector('.saiba-mais');
            const nomeAtleta = detalhesAtleta.querySelector('.nome-atleta');
            saibaMais.addEventListener('click', () => {
                 window.location.href = `detalhes.html?id=${atleta.id}`;
            });
            nomeAtleta.addEventListener('click', () => {
                window.location.href = `detalhes.html?id=${atleta.id}`;
            });

            containerElenco.appendChild(cartaoAtleta);

        });
    })
    .catch(error => {
        console.error(`Erro ao buscar elenco ${genero}:`, error);
    });
}
});
