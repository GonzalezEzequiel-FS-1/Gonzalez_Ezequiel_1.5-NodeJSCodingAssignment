const getPkmn = require("./getPkmn");
const fs = require("fs");
const readArray = require("./pokedex");
const path = require("path");
const updateFile = require("./updateFile")

// const selectedPkmn = getPkmn(25, "id")
// const indexToDelete = parseInt(selectedPkmn.index);
//const pokemonToDelete = selectedPkmn.pokemon;


/*Brainstorming:
    1- Import the selected pokemon and its index
    2- Import the Complete Pokedex
    3- Filter the pokedex to exclude the index number
    4- Create a new array without the selected pokemon splice???, filter??? IDK
    5- Return the array
*/
const pokeDelete = async (id) => {
    const selectedPkmn = getPkmn(id, "id")
    indexToDelete = parseInt(selectedPkmn.index);
    try {
        const pokedex = await readArray();
        pokedex.splice(indexToDelete, 1);
        const newPokedex = Array.from(pokedex)
        updateFile(newPokedex)
    } catch (error) {
        console.error(`There was a problem deleting the pokemon \n ${error}`)
    }
};


module.exports = pokeDelete;