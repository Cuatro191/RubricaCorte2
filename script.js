document.addEventListener('DOMContentLoaded', function () {
    const cardContainer = document.getElementById('card-container');
    const characterSelect = document.getElementById('character-select');

    async function fetchCharacters() {
        try {
            const response = await fetch('https://rickandmortyapi.com/api/character');
            const data = await response.json();

            cardContainer.innerHTML = '';

            data.results.forEach((character) => {
                const card = document.createElement('div');
                card.classList.add('card');
                card.innerHTML = `
                    <img src="${character.image}" alt="${character.name}">
                    <h3>${character.name}</h3>
                `;
                cardContainer.appendChild(card);

                // Agregar opción al filtro
                const option = document.createElement('option');
                option.value = character.name;
                option.textContent = character.name;
                characterSelect.appendChild(option);
            });
        } catch (error) {
            console.error('Error al cargar los personajes:', error);
        }
    }

    fetchCharacters();

    characterSelect.addEventListener('change', function () {
        const selectedCharacter = characterSelect.value;
        const cards = document.querySelectorAll('.card');

        cards.forEach((card) => {
            if (selectedCharacter === 'all' || card.querySelector('h3').textContent === selectedCharacter) {
                card.style.display = 'inline-block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
