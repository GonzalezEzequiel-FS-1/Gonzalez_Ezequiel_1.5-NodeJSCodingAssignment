const readArray = require("./pokedex")
const getPkmn = require("./getPkmn")
const updateFile = require("./updateFile");
const fs = require("fs");



const editPkmn = async (id, newname, img, type, height, weight, weaknesses, prev_evolution, next_evolution) => {
    const selectedPkmn = getPkmn(id, "id");
    const pokedex = readArray()
    const editedPkmn = pokedex[selectedPkmn.index];
    try {
        if (!editPkmn) {
            console.error("please Select a pokemon to edit")
        } else {
            if (editedPkmn.name === null || editedPkmn.img === null || editedPkmn.type === null || editedPkmn.height === null || editedPkmn.weight === null || editedPkmn.weaknesses === null || editedPkmn.prev_evolution === null || editedPkmn.next_evolution) {
                if (newname !== null) editedPkmn.name = newname;
                if (img !== null) editedPkmn.img = img;
                if (type !== null && type.length > 0) editedPkmn.type = type;
                if (height !== null) editedPkmn.height = height;
                if (weight !== null) editedPkmn.weight = weight;
                if (weaknesses  !== null && weaknesses.length > 0) editedPkmn.weaknesses = weaknesses;
                if (prev_evolution !== null && prev_evolution.length > 0) editedPkmn.prev_evolution = prev_evolution;
                if (next_evolution !== null && next_evolution .length > 0) editedPkmn.next_evolution = next_evolution;
            }
            updateFile(pokedex);
        };
    } catch (error) {
        console.error(`There was an error editing the pokemon ${error}`)
    }
    return editedPkmn;
}

//editPkmn(null, null, null, null, null, null, null);
module.exports = editPkmn;