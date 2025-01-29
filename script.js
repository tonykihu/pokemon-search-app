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


searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        const searchUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchValue}`;
        fetch(searchUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                pokemonName.textContent = `NAME: ${data.name.toUpperCase()}`;
                
                pokemonId.textContent = data.id;
                weight.textContent = data.weight;
                height.textContent = data.height;
                types.textContent = data.types.map(type => type.type.name).join(', ').toUpperCase();
                hp.textContent = data.stats.find(stat => stat.stat.name === 'hp').base_stat;
                attack.textContent = data.stats.find(stat => stat.stat.name === 'attack').base_stat;
                defense.textContent = data.stats.find(stat => stat.stat.name === 'defense').base_stat;
                specialAttack.textContent = data.stats.find(stat => stat.stat.name === 'special-attack').base_stat;
                specialDefense.textContent = data.stats.find(stat => stat.stat.name === 'special-defense').base_stat;
                speed.textContent = data.stats.find(stat => stat.stat.name === 'speed').base_stat;
                details.style.display = "block";

            })
            .catch(error => {
                details.innerHTML = `<p>Error: ${error.message}</p>`;
                details.style.display = "block";
            });
    } else {
        details.innerHTML = "<p>Please enter a Pokémon name or ID.</p>";
        details.style.display = "block";
    }
});