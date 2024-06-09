const readArray = require("./pokedex");
const capitalizeFirstLetter = require("./capFormatting");

const getPkmn = (userSelection, criteria) => {
    let selectedPkmn;
    const pokedex = readArray();
    try {
        if (isNaN(userSelection)) {
            if (criteria === "type" || criteria === "weaknesses") {
                const capSelection = capitalizeFirstLetter(userSelection);
                selectedPkmn = pokedex.filter(pokemon => pokemon[criteria].includes(capSelection));
            } else if (criteria === "next_evolution" || criteria === "prev_evolution") {
                selectedPkmn = pokedex.filter(pokemon => {
                    return pokemon[criteria].some(evolution => evolution.name.toLowerCase() === userSelection.toLowerCase());
                });
            } else if (criteria === "name") {
                const capSelection = capitalizeFirstLetter(userSelection);
                selectedPkmn = pokedex.find(pokemon => pokemon[criteria] === capSelection);
            } else {
                throw new Error("Invalid criteria");
            }
        } else {
            if (criteria === "id") {
                const selectedNumber = parseInt(userSelection);
                selectedPkmn = pokedex.find(pokemon => pokemon[criteria] === selectedNumber);
            } else {
                throw new Error("Invalid criteria");
            }
        }
    } catch (error) {
        console.error(`Something went Wrong${error}`);
    };
    //console.log(selectedPkmn)
    return selectedPkmn;
};

//(userSelection, criteria)
//getPkmn("fire", "type");
module.exports = getPkmn;