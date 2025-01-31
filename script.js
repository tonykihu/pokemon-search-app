const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');
const pokemonName = document.getElementById('pokemon-name');
const pokemonImage = document.getElementById('sprite');
const pokemonId = document.getElementById('pokemon-id');
const weight = document.getElementById('weight');
const height = document.getElementById('height');
const types = document.getElementById('types');
const hp = document.getElementById('hp');
const attack = document.getElementById('attack');
const defense = document.getElementById('defense');
const specialAttack = document.getElementById('special-attack');
const specialDefense = document.getElementById('special-defense');
const speed = document.getElementById('speed');
const details = document.getElementById('details');

function clearTypes() {
    types.innerHTML = '';
}

function displayTypes(data) {
    clearTypes();
  const typeNames = data.types.map(type => type.type.name);
     typeNames.forEach(type => {
    const typeElement = document.createElement('div');
    typeElement.textContent = type.toUpperCase();
    typesContainer.appendChild(typeElement);
  });
}

searchButton.addEventListener('click', () => {
    const searchValueInput = searchInput.value.trim();
    const searchValue = pokemonNameFormat(searchValueInput);
    if (searchValue) {
        const searchUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchValue}`;
        fetch(searchUrl)
            .then(response => {
                if (!response.ok) {
                    alert("Pokémon not found");
                }
                return response.json();
            })
            .then(data => {
                pokemonName.textContent = data.name.toUpperCase();
                pokemonImage.src = data.sprites.front_default;
                pokemonId.textContent = data.id;
                weight.textContent = data.weight;
                height.textContent = data.height;
                types.textContent = displayTypes(data); //data.types.map(type => type.type.name).join(', ').toUpperCase();
                hp.textContent = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
                attack.textContent = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
                defense.textContent = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
                specialAttack.textContent = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
                specialDefense.textContent = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
                speed.textContent = data.stats.find(stat => stat.stat.name === 'speed').base_stat;
                details.style.display = "block";

            });
    } else if (searchValue == "") {
        alert("Please enter a Pokémon name or ID");
    } else {
        clearTypes();
    }
});

function pokemonNameFormat(name) {
    name = name.toLowerCase();

    name = name.replace(/[^a-z0-9]/g, '');

    if (name.includes("♀")) {
        name = name.replace("♀","").trim() + "-f";
    }   else if (name.includes("♂")) {
        name = name.replace("♂","").trim() + "-m";
    }

    name = name.replace(/-+/g, "-");

    name = name.replace(/^-|-$/g, "");

    return name;
};