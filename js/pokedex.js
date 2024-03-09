
const listaPokemon = document.querySelector("#listaPokemon");
const botonesHeader = document.querySelectorAll(".btn-header")

let URL = "https://pokeapi.co/api/v2/pokemon/";

for(let i =1; i <=151; i++) {
    fetch(URL + i)
    .then((response) => response.json())
    .then(data => mostrarPokemon(data))
} 

function mostrarPokemon(pokeapi){
    
    let tipos = pokeapi.types.map((type) =>
        ` <p class="${type.type.name} tipo">${type.type.name}</p>`);
        tipos=tipos.join("");
    
        let pokeId = pokeapi.id.toString();
        if (pokeId.length === 1) {
            pokeId = "000" + pokeId;
        } else if (pokeId.length === 2) {
            pokeId = "00" + pokeId;
        }else if (pokeId.length === 3) {
            pokeId = "0" + pokeId;
        }
    


        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.innerHTML = `
        <div class="pokemon-imagen">
            <img src="${pokeapi.sprites.other["official-artwork"].front_default}" alt="${pokeapi.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${pokeapi.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stats">${pokeapi.height}m</p>
                <p class="stats">${pokeapi.weight}kg</p>
            </div>
        </div>
        `;
        listaPokemon.append(div);
    }

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;

    listaPokemon.innerHTML = "";

    for(let i =1; i <=1025; i++) {
        fetch(URL + i)
        .then((response) => response.json())
        .then(data => {

            if (botonId === "ver-todos") {
                mostrarPokemon(data);
            } else{
            const tipos = data.types.map(type => type.type.name);
            if (tipos.some(tipo => tipo.includes(botonId))) {
                mostrarPokemon(data);
            }
        }

        })
    } 

}))



function mostrarPokemon(pokeapi) {
    const tipos = pokeapi.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`).join("");
    const pokeId = pokeapi.id.toString().padStart(3, "0");
    
    const div = document.createElement("div");
    div.classList.add("pokemon");
    div.innerHTML = `
        <div class="pokemon-imagen">
            <img src="${pokeapi.sprites.other["official-artwork"].front_default}" alt="${pokeapi.name}">
        </div>
        <div class="pokemon-info">
            <div class="nombre-contenedor">
                <p class="pokemon-id">#${pokeId}</p>
                <h2 class="pokemon-nombre">${pokeapi.name}</h2>
            </div>
            <div class="pokemon-tipos">
                ${tipos}
            </div>
            <div class="pokemon-stats">
                <p class="stats">${pokeapi.height}m</p>
                <p class="stats">${pokeapi.weight}kg</p>
            </div>
        </div>
    `;
    listaPokemon.append(div);
}

function fetchPokemonData(id) {
    return fetch(URL + id)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .catch((error) => {
                console.error("Error fetching Pokémon data:", error);
            });
}

botonesHeader.forEach(boton => boton.addEventListener("click", (event) => {
    const botonId = event.currentTarget.id;
    listaPokemon.innerHTML = "";

    if (botonId === "ver-todos") {
        for (let i = 1; i <= 151; i++) {
            fetchPokemonData(i).then(data => mostrarPokemon(data));
        }
    } else {
        for (let i = 1; i <= 1026; i++) {
            fetchPokemonData(i)
                .then(data => {
                    const tipos = data.types.map(type => type.type.name);
                    if (tipos.some(tipo => tipo.includes(botonId))) {
                        mostrarPokemon(data);
                    }
                });
        }
    }
}));
