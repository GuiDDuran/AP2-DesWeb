document.addEventListener("DOMContentLoaded", function () {

    const audio = document.getElementById('audioPlayer');
    audio.volume = 0.3;

    const autenticado = localStorage.getItem('autenticado');

    if (!autenticado || autenticado !== 'true') {
        
        const containerElenco = document.getElementById("elenco");
        containerElenco.innerHTML = '';

        const msgAutorizacao = document.getElementById("msg_autorizacao");
        msgAutorizacao.style.display = 'block';

        containerElenco.appendChild(msgAutorizacao);

        const barraEscolhas = document.getElementById("barra-escolhas");
        barraEscolhas.style.display = 'none';

        const selectEscolhas = document.getElementById("select_escolhas");
        selectEscolhas.style.display = 'none';

        const logout = document.getElementById("logout");
        logout.addEventListener("click", () => {
        localStorage.removeItem('autenticado');
        window.location.href = 'index.html'; 
        });
    } 
    
    else {
        const logout = document.getElementById("logout");
        logout.addEventListener("click", () => {
            localStorage.removeItem('autenticado');
            window.location.href = `index.html`;
        });

        const btnMasc = document.getElementById("btn_masc");
        const btnFem = document.getElementById("btn_fem");
        const btnAll = document.getElementById("btn_all");
        btnMasc.addEventListener("click", () => carregaAtletas("masculino"));
        btnFem.addEventListener("click", () => carregaAtletas("feminino"));
        btnAll.addEventListener("click", () => carregaAtletas("all"));

        const selectEscolhas = document.getElementById("select_escolhas");
        selectEscolhas.addEventListener("change", function () {
            const generoSelecionado = this.value;
            carregaAtletas(generoSelecionado);
        });

        function carregaAtletas(genero) {
            const containerElenco = document.getElementById("elenco");
            containerElenco.innerHTML = '';
            document.getElementById('msg_carregando').style.display = 'block';

            fetch(`https://botafogo-atletas.mange.li/${genero}`)
                .then(response => response.json())
                .then(data => {
                    data.forEach(atleta => {
                        const atletaCartao = document.createElement('div');
                        atletaCartao.className = 'atleta-cartao';
                        atletaCartao.addEventListener('click', () => {
                            document.getElementById('msg_carregando').style.display = 'block';
                            window.location.href = `detalhes.html?id=${atleta.id}`;
                        });

                        const ateltaImagem = document.createElement('img');
                        ateltaImagem.className = 'atleta-img';
                        ateltaImagem.src = atleta.imagem;

                        const atletaDetalhes = document.createElement('div');
                        atletaDetalhes.className = 'atleta-detalhes';
                        atletaDetalhes.innerHTML = ` 
                            <p class="nome-atleta">${atleta.nome}</p> 
                            <p class="saiba-mais">Saiba mais</p>
                        `;

                        atletaCartao.appendChild(ateltaImagem);
                        atletaCartao.appendChild(atletaDetalhes);
                        containerElenco.appendChild(atletaCartao);
                    });
                    document.getElementById('msg_carregando').style.display = 'none';
                });
        }
    }
});
