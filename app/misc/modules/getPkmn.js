const readArray = require("./pokedex");
const capitalizeFirstLetter = require("./capFormatting");

const getPkmn = (userSelection, criteria) => {
    let selectedPkmn;
    let selectedIndex;
    const pokedex = readArray();
    try {
        if (isNaN(userSelection)) {
            if (criteria === "type" || criteria === "weaknesses") {
                const capSelection = capitalizeFirstLetter(userSelection);
                selectedPkmn = pokedex.filter((pokemon, index) => {
                    if (pokemon[criteria].includes(capSelection)) {
                        selectedIndex = index;
                        return true;
                    }
                    return false;
                });
            } else if (criteria === "next_evolution" || criteria === "prev_evolution") {
                selectedPkmn = pokedex.filter((pokemon, index) => {
                    if (pokemon[criteria].some(evolution => evolution.name.toLowerCase() === userSelection.toLowerCase())) {
                        selectedIndex = index;
                        return true;
                    }
                    return false;
                });
            } else if (criteria === "name") {
                const capSelection = capitalizeFirstLetter(userSelection);
                selectedPkmn = pokedex.find((pokemon, index) => {
                    if (pokemon[criteria] === capSelection) {
                        selectedIndex = index;
                        return true;
                    }
                    return false;
                });
            } else {
                throw new Error("Invalid criteria");
            }
        } else {
            if (criteria === "id") {
                const selectedNumber = parseInt(userSelection);
                selectedPkmn = pokedex.find((pokemon, index) => {
                    if (pokemon[criteria] === selectedNumber) {
                        selectedIndex = index;
                        return true;
                    }
                    return false;
                });
            } else {
                throw new Error("Invalid criteria");
            }
        }
    } catch (error) {
        console.error(`Something went Wrong${error}`);
    };
    // Return an object containing both the selected Pokémon and its index
    //For Testing Purposes
    //results = [{selectedIndex, selectedPkmn}]
    //console.log(selectedIndex, selectedPkmn)
    //console.log(results)
    return {
        index: selectedIndex,
        pokemon: selectedPkmn
    };

};

//(userSelection, criteria)
// getPkmn("pikachu", "name");
//console.log(result);
module.exports = getPkmn;