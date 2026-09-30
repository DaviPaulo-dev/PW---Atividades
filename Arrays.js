const produtos = [
    ['Porsche Cayenne', 'Motor V8 Hybrid', 'Carro', 1220000, 'Imagens/porsche.png'],
    ['Mercedes CLS 63', 'Motor V6 Hybrid', 'Carro', 1450000, 'Imagens/mercedes.png'],
    ['Samsung Z Fold 8 Pro', '1TB 16RAM', 'Celular', 16000, 'Imagens/samsung.png'],
    ['Iphone 17 Pro Max', '1TB 16RAM', 'Celular', 17000, 'Imagens/iphone.png'],
    ['Motorola signature', '1TB 16RAM', 'Celular', 12000, 'Imagens/motorola.png'],
    ['Thinkpad Lenovo', '248GB SSD 16RAM', 'Nootbook', 2458, 'Imagens/thinkpad.png'],
    ['ASUS Rog Strix', '512GB SSD 32RAM', 'Nootbook', 26999, 'Imagens/ASUS.png'],
    ['ACER', '1TB SSD 32RAM', 'Nootbook', 36642, 'Imagens/ACER.png'], 
];

const catalogo = document.getElementById("catalogo");
const pesquisa = document.getElementById("pesquisa");


function mostrarProdutos(lista) {

    catalogo.innerHTML = "";

    lista.forEach((produto) => {

        const div = document.createElement("div");
        div.classList.add("produto");

        const img = document.createElement("img");
        img.src = produto[4];
        img.alt = produto[0];

        const h2 = document.createElement("h2");
        h2.textContent = produto[0];

        const p = document.createElement("p");
        p.textContent = produto[1];

        const p2 = document.createElement("p");
        p2.textContent = produto[2];


        const p3 = document.createElement("p");
        p3.textContent = "R$ " + produto[3].toLocaleString("pt-BR");


        div.appendChild(img);
        div.appendChild(h2);
        div.appendChild(p);
        div.appendChild(p2);
        div.appendChild(p3);
        catalogo.appendChild(div);
    });
}

mostrarProdutos(produtos);

// Pesquisa
pesquisa.addEventListener("input", () => {

    const texto = pesquisa.value.toLowerCase().trim();

    const resultado = produtos.filter((produto) => {

        return (
            produto[0].toLowerCase().includes(texto) ||
            produto[1].toLowerCase().includes(texto) ||
            produto[2].toLowerCase().includes(texto)
        );

    });

    mostrarProdutos(resultado);
});
