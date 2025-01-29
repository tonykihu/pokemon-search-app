const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

let startIndex = 1;
let endIndex = 20;

searchButton.addEventListener('click', () => {
    const searchValue = searchInput.value.trim();
    if (searchValue) {
        const searchUrl = `https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/{name-or-id}`;
        fetch(searchUrl)
            .then(response => response.json())
            .then(data => {
                console.log(data);
            })
            .catch(error => console.error(error));
            }
});