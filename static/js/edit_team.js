document.addEventListener('DOMContentLoaded', function() {
    const pokemonSlots = document.querySelectorAll('.pokemon-slot');
    let pokemonSelectOptions = [];

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    }

    function populatePokemonSlot(slot) {
        const pokemonNameSelect = slot.querySelector('select[name^="pokemon-name"]');
        const moveSelects = slot.querySelectorAll('select[name^="move-"]');
        const abilitySelect = slot.querySelector('select[name^="ability"]');
        const itemSelect = slot.querySelector('select[name^="item"]');

        pokemonSelectOptions.forEach(option => {
            const newOption = option.cloneNode(true);
            pokemonNameSelect.appendChild(newOption);
        });
        
        pokemonNameSelect.addEventListener('change', function() {
            const pokemonName = pokemonNameSelect.value;
            if (pokemonName) {
                fetch(`/teambuilder/get_pokemon_details/${pokemonName}/`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.error) {
                            alert(data.error);
                            return;
                        }

                        moveSelects.forEach((moveSelect, index) => {
                            moveSelect.innerHTML = '';
                            data.moves.forEach(move => {
                                const moveOption = document.createElement('option');
                                moveOption.value = move.name;
                                moveOption.textContent = capitalizeFirstLetter(move.name);
                                moveSelect.appendChild(moveOption);
                            });
                        });

                        abilitySelect.innerHTML = '';
                        data.abilities.forEach(ability => {
                            const abilityOption = document.createElement('option');
                            abilityOption.value = ability.name;
                            abilityOption.textContent = capitalizeFirstLetter(ability.name);
                            abilitySelect.appendChild(abilityOption);
                        });
                        
                        pokemonNameSelect.dispatchEvent(new CustomEvent('detailsLoaded'));
                    })
                    .catch(error => console.error('Error fetching Pokemon details:', error));
            }
        });
    }
    function initializePokemonOptions() {
        console.log("Initializing Pokemon options");
        return fetch('/teambuilder/get_all_pokemons/')
            .then(response => response.json())
            .then(data => {
                console.log("Received all Pokemons data");
                pokemonSelectOptions = data.pokemons.map(pokemon => {
                    const option = document.createElement('option');
                    option.value = pokemon.name;
                    option.textContent = capitalizeFirstLetter(pokemon.name);
                    return option;
                });
                pokemonSlots.forEach(slot => populatePokemonSlot(slot));
            })
            .catch(error => console.error('Error fetching Pokemon options:', error));
    }
    function populateForm(teamData) {
        console.log("Populating form with team data:", teamData);
        document.getElementById('team-name').value = teamData.name;
        teamData.pokemons.forEach((pokemon, index) => {
            const slot = index + 1;
            const pokemonSelect = document.querySelector(`select[name="pokemon-name-${slot}"]`);
            const abilitySelect = document.querySelector(`select[name="ability-${slot}"]`);
            const itemSelect = document.querySelector(`select[name="item-${slot}"]`);
            const moveSelects = [
                document.querySelector(`select[name="move-${slot}-1"]`),
                document.querySelector(`select[name="move-${slot}-2"]`),
                document.querySelector(`select[name="move-${slot}-3"]`),
                document.querySelector(`select[name="move-${slot}-4"]`)
            ];

            if (pokemonSelect) {
                pokemonSelect.value = pokemon.name;
                pokemonSelect.dispatchEvent(new Event('change'));

                pokemonSelect.addEventListener('detailsLoaded', function onDetailsLoaded() {
                    if (abilitySelect) abilitySelect.value = pokemon.ability;
                    if (itemSelect) itemSelect.value = pokemon.item;
                    pokemon.moves.forEach((move, moveIndex) => {
                        if (moveSelects[moveIndex]) moveSelects[moveIndex].value = move;
                    });
                    pokemonSelect.removeEventListener('detailsLoaded', onDetailsLoaded);
                });
            }
        });
    }

    document.getElementById('team-form').addEventListener('submit', function(event) {
        const pokemonNameSelects = document.querySelectorAll('select[name^="pokemon-name"]');
        let allPokemonSelected = true;
        pokemonNameSelects.forEach(select => {
            if (!select.value) {
                allPokemonSelected = false;
            }
        });

        if (!allPokemonSelected) {
            alert('Please select all six Pokémon.');
            event.preventDefault();
        }

        const teamName = document.getElementById('team-name').value.trim();
        if (!teamName) {
            alert('Please enter a team name.');
            event.preventDefault();
        }
    });
    function getTeamId() {
        const pathParts = window.location.pathname.split('/');
        const teamId = pathParts[pathParts.length - 2];  
        console.log("Retrieved team ID:", teamId);
        return teamId;
    }
    

     function loadTeamData() {
        const teamId = getTeamId();
        if (teamId && !isNaN(teamId)) {
            console.log("Fetching team data for ID:", teamId);
            return fetch(`/teambuilder/get_team_details/${teamId}/`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    console.log("Received team data:", data);
                    populateForm(data);
                })
                .catch(error => console.error('Error fetching team details:', error));
        } else {
            console.log("No valid team ID found, skipping team data load");
            return Promise.resolve();
        }
    }

    initializePokemonOptions()
        .then(() => loadTeamData())
        .catch(error => console.error('Error initializing:', error));
});