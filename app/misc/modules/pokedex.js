const fs = require("fs");
const path = require("path");

const readArray = () => {
    //console.log("Reading Array");
    const filepath = path.join(__dirname, "../jsonFiles/pokedex.json");
    try {
        const data = fs.readFileSync(filepath, "utf-8");
        const pokedex = JSON.parse(data);
        const stringArray = JSON.stringify(pokedex);
        //console.log(pokedex);
        return pokedex;
    } catch (error) {
        console.error(`Error Parsing File: ${error.message}`);
        return null;
    }
};
//readArray();

/*
const checkArray = (pokedex) => {
    if (!Array.isArray(pokedex)) {
        console.log("not an array");
    } else {
        console.log("array found");
    }
};

const pokedex = readArray();
if (pokedex !== null) {
    checkArray(pokedex);
}
*/

module.exports = readArray;
