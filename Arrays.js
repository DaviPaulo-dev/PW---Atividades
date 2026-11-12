
const frutas = [
    {
        id: 1,
        nome: "Dragon",
        raridade: "Mítico",
        regular: "3.1B",   
        permanente: "4.83B",
        ordem: 27600000000,
        beli: "15M",
        demanda: 9,
        imagem: "Imagens/dragon.png"
    },
    {
        id: 2,
        nome: "Kitsune",
        raridade: "Mítico",
        regular: "460M",
        permanente: "4.2B",
        ordem: 40000000000,
        beli: "8M",
        demanda: 8,
        imagem: "Imagens/kitsune.png"
    },
    {
        id: 3,
        nome: "Yeti",
        raridade: "Mítico",
        regular: "70M",
        permanente: "1.2B",
        ordem: 700000000,
        beli: "5M",
        demanda: 6,
        imagem: "Imagens/yeti.png"
    },
    {
        id: 4,
        nome: "Gas",
        raridade: "Mítico",
        regular: "50M",
        permanente: "1.13B",
        ordem: 6000000000,
        beli: "5M",
        demanda: 8,
        imagem: "Imagens/gas.png"
    },
    {
        id: 5,
        nome: "Venom",
        raridade: "Mítico",
        regular: "120M",
        permanente: "1.11B",
        ordem: 1200000000,
        beli: "3M",
        demanda: 10,
        imagem: "Imagens/venom.png"
    },
    {
        id: 6,
        nome: "Dough",
        raridade: "Mítico",
        regular: "30M",
        permanente: "1.8B",
        ordem: 3000000000,
        beli: "2.8M",
        demanda: 9,
        imagem: "Imagens/dough.png"
    },
    {
        id: 7,
        nome: "Tiger",
        raridade: "Mítico",
        regular: "80M",
        permanente: "2.3B",
        ordem: 500000000,
        beli: "5M",
        demanda: 7,
        imagem: "Imagens/tiger.png"
    },
    {
        id: 8,
        nome: "Buddha",
        raridade: "Lendário",
        regular: "10M",
        permanente: "1.5B",
        ordem: 80000000,
        beli: "1.2M",
        demanda: 9,
        imagem: "Imagens/buddha.png"
    },
    {
        id: 9,
        nome: "Rocket",
        raridade: "Comum",
        regular: "900K",
        permanente: "3M",
        ordem: 7000000,
        beli: "5K",
        demanda: 3,
        imagem: "Imagens/rocket.png"
    },
    {
        id: 10,
        nome: "Blade",
        raridade: "Comum",
        regular: "1M",
        permanente: "5M",
        ordem: 8000000,
        beli: "30K",
        demanda: 4,
        imagem: "Imagens/blade.png"
    },
    {
        id: 11,
        nome: "String",
        raridade: "Comum",
        regular: "1.1M",
        permanente: "5M",
        ordem: 9000000,
        beli: "180K",
        demanda: 1,
        imagem: "Imagens/string.png"
    },
    {
        id: 12,
        nome: "Phoenix",
        raridade: "Lendário",
        regular: "2.75M",
        permanente: "1B",
        ordem: 75000000,
        beli: "1.8M",
        demanda: 6,
        imagem: "Imagens/phoenix.png"
    }
];

const catalogo = document.getElementById("catalogo");
const pesquisa = document.getElementById("pesquisa");
const ordenacao = document.getElementById("ordenacao");
const categorias = document.getElementById("categorias");
const mensagem = document.getElementById("mensagem");

let categoriaAtual = "Todas";
let tipoAtual = {};

frutas.forEach(fruta => {
    tipoAtual[fruta.id] = "regular";
});


// CRIAR OS CARDS

function mostrarFrutas(lista) {

    catalogo.innerHTML = "";

    mensagem.textContent = lista.length === 0
        ? "Nenhuma fruta encontrada."
        : "";

    lista.forEach(fruta => {

        const tipo = tipoAtual[fruta.id];

        const valor = tipo === "regular"
            ? fruta.regular
            : fruta.permanente;

        const raridadeClasse = fruta.raridade
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "");

        const div = document.createElement("div");
        div.classList.add("produto");

        div.innerHTML = `
            <div class="imagem-produto">

                <img
                    src="${fruta.imagem}"
                    alt="${fruta.nome}"
                    onerror="this.style.display='none'"
                >

                <span class="raridade ${raridadeClasse}">
                    ${fruta.raridade}
                </span>

            </div>

            <div class="informacoes">

                <h2>${fruta.nome}</h2>

                <div class="tipo-valor">

                    <button
                        class="${tipo === "regular" ? "ativo" : ""}"
                        data-id="${fruta.id}"
                        data-tipo="regular">
                        Regular
                    </button>

                    <button
                        class="${tipo === "permanente" ? "ativo" : ""}"
                        data-id="${fruta.id}"
                        data-tipo="permanente">
                        Permanente
                    </button>

                </div>

                <div class="valor">

                    <strong>${valor}</strong>

                    <span class="status">Estável</span>

                </div>

                <div class="demanda-texto">
                    <span>Demanda</span>
                    <span>${fruta.demanda}/10</span>
                </div>

                <div class="barra-demanda">

                    ${Array.from({ length: 10 }, (_, i) => `
                        <span class="${i < fruta.demanda ? "preenchido" : ""}"></span>
                    `).join("")}

                </div>

                <div class="detalhe">
                    <span>Preço Beli</span>
                    <strong>${fruta.beli}</strong>
                </div>

                <div class="detalhe">
                    <span>Tipo de fruta</span>
                    <strong>${fruta.raridade}</strong>
                </div>

                <p class="atualizacao">
                    Valores editáveis
                </p>

            </div>
        `;

        catalogo.appendChild(div);

    });

}



function filtrarFrutas() {

    const texto = pesquisa.value.toLowerCase().trim();

    let resultado = frutas.filter(fruta => {

        const correspondeNome = fruta.nome
            .toLowerCase()
            .includes(texto);

        const correspondeCategoria =
            categoriaAtual === "Todas" ||
            fruta.raridade === categoriaAtual;

        return correspondeNome && correspondeCategoria;

    });

    // ORDENAÇÃO

    if (ordenacao.value === "nome") {

        resultado.sort((a, b) =>
            a.nome.localeCompare(b.nome)
        );

    } else if (ordenacao.value === "maior") {

        resultado.sort((a, b) =>
            b.ordem - a.ordem
        );

    } else if (ordenacao.value === "menor") {

        resultado.sort((a, b) =>
            a.ordem - b.ordem
        );

    }

    mostrarFrutas(resultado);

}


catalogo.addEventListener("click", (event) => {

    const botao = event.target.closest("button");

    if (!botao) return;

    const id = Number(botao.dataset.id);
    const tipo = botao.dataset.tipo;

    if (!id || !tipo) return;

    tipoAtual[id] = tipo;

    filtrarFrutas();

});



categorias.addEventListener("click", (event) => {

    const botao = event.target.closest(".categoria");

    if (!botao) return;

    document.querySelectorAll(".categoria").forEach(item => {
        item.classList.remove("ativa");
    });

    botao.classList.add("ativa");

    categoriaAtual = botao.dataset.categoria;

    filtrarFrutas();

});


// EVENTOS DA PESQUISA E ORDENAÇÃO

pesquisa.addEventListener("input", filtrarFrutas);

ordenacao.addEventListener("change", filtrarFrutas);


// INICIAR CATÁLOGO

mostrarFrutas(frutas);
