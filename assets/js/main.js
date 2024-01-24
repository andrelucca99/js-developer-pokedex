const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const cardDetails = document.querySelector('.card__details');

const maxRecords = 151
const limit = 10
let offset = 0;

function getPokemon(pokemon) {
    return `
        <dialog open class="details ${pokemon.type}">
            <div class="details__info">
                <div>
                    <h2>${pokemon.name}</h2>
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                </div>
                <span>#${pokemon.number}</span>
            </div>
            
            <img src="${pokemon.photo}" alt="${pokemon.name}">
            

            <div class="ficha_details">
                <table>
                    <tr>
                        <th>About</th>
                        <th>Attack</th>
                        <th>Defense</th>
                    </tr>
                    <tr>
                        <td>Type</td>
                        <td>00</td>
                        <td>00</td>
                    </tr>
                    <tr>
                        <td>Regions</td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>City</td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </div>
        </dialog>
    `
}

function btnDetails(numberPokemon) {
    pokeApi.getPokemonID(numberPokemon).then((pokemon) => {
        const newHtml = getPokemon(pokemon)
        cardDetails.innerHTML = newHtml
    })
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <span class="number">#${pokemon.number}</span>
            <span class="name">${pokemon.name}</span>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>

                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>
            <button value=${pokemon.number}>Details</button>
        </li>
    `
}

pokemonList.addEventListener("click", (e) => {  
    btnDetails(e.target.value)
});

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)


loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})
