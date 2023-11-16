document.addEventListener("DOMContentLoaded", function(){

    const params = new URLSearchParams(window.location.search);
    const atletaId = params.get('id');
    const atletaDetalhes = document.getElementById("atleta_detalhes");
    const atletaImagem = document.getElementById("atleta_imagem");
    const atletaNome = document.getElementById("atleta_nome");
    const atletaPosicao = document.getElementById("atleta_posicao");
    const atletaDescricao = document.getElementById("atleta_descricao");
    const atletaNomeCompleto = document.getElementById("atleta_nome_completo");
    const atletaNascimento = document.getElementById("atleta_nascimento");
    const atletaAltura = document.getElementById("atleta_altura");
    const voltar = document.getElementById("voltar_pag");
    voltar.addEventListener("click", () => {
        window.location.href = `home.html`;
    });

    const autenticado = localStorage.getItem('autenticado');

    if (!autenticado || autenticado !== 'true') {

        const msgAutorizacao = document.getElementById("msg_autorizacao");
        msgAutorizacao.style.display = 'block';

        const atletaDetalhes = document.getElementById("atleta_detalhes");
        atletaDetalhes.style.display = 'none';

        const voltarPag = document.getElementById("voltar_pag");
        voltarPag.addEventListener("click", () => {
        localStorage.removeItem('autenticado');
        window.location.href = 'index.html'; 
        });
    } 

    function buscaAtleta(id){

        document.getElementById('msg_carregando').style.display = 'block';

        if(id <= 60){

            fetch(`https://botafogo-atletas.mange.li/${id}`)
            .then(response => {
            if (!response.ok){
                throw new Error("Erro")
            }
            return response.json()
            })
            .then(atleta => {
                atletaImagem.src = atleta.imagem;
                atletaNome.textContent = `${atleta.nome}`;
                atletaPosicao.textContent = `${atleta.posicao}`;
                atletaDescricao.textContent = `${atleta.descricao}`;
                atletaNomeCompleto.textContent = `NOME COMPLETO: ${atleta.nome_completo}`;
                atletaNascimento.textContent = `NASCIMENTO: ${atleta.nascimento}`; 
                atletaAltura.textContent = `ALTURA: ${atleta.altura}`;
                document.getElementById('msg_carregando').style.display = 'none';
            })
        }

        else{
            atletaDetalhes.innerHTML = "<p>Atleta não encontrado(a)!!!</p>";
            atletaDetalhes.style.fontFamily = 'Alumni Sans Inline One, sans-serif';
            atletaDetalhes.style.fontSize = '50px'

            document.getElementById('msg_carregando').style.display = 'none';
            return;
        }
    }
    buscaAtleta(atletaId);
})