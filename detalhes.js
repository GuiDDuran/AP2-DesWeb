document.addEventListener("DOMContentLoaded", function(){

    const voltar = document.getElementById("voltar_pag");
    voltar.addEventListener("click", () => {
        window.location.href = `home.html`;
    });

    const detalhes_atleta = document.getElementById("detalhes_atleta");
    const imagem_atleta = document.getElementById("imagem_atleta");
    const nome_atleta = document.getElementById("nome_atleta");
    const posicao_atleta = document.getElementById("posicao_atleta");
    const descricao_atleta = document.getElementById("descricao_atleta");
    const nome_completo_atleta = document.getElementById("nome_completo_atleta");
    const nascimento_atleta = document.getElementById("nascimento_atleta");
    const altura_atleta = document.getElementById("altura_atleta");
    
    const params = new URLSearchParams(window.location.search);
    const atleta_id = params.get('id');

    function buscaAtleta(id){
        fetch(`https://botafogo-atletas.mange.li/${id}`)
        .then(response => response.json())
        .then(atleta => {
            imagem_atleta.src = atleta.imagem;
            nome_atleta.textContent = `${atleta.nome}`;
            posicao_atleta.textContent = `${atleta.posicao}`;
            descricao_atleta.textContent = `${atleta.descricao}`;
            nome_completo_atleta.textContent = `Nome Completo: ${atleta.nome_completo}`
            nascimento_atleta.textContent = `Nascimento: ${atleta.nascimento}`; 
            altura_atleta.textContent = `Altura: ${atleta.altura}`;
        })

        //Não está funcionando
        .catch(error => {
            console.error('Erro ao buscar detalhes do atleta:', error);
            detalhes_atleta.innerHTML = "<p>Erro ao buscar detalhes do atleta.</p>";
        });
    }

    buscaAtleta(atleta_id);
})