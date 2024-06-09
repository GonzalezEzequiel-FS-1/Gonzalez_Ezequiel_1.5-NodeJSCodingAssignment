const pokeGet = require("./getPkmn");
const fs = require("fs");
const pokedex = require("./pokedex");
const path = require("path");


/*Brainstorming:
    1- Import the selected pokemon and its index
    2- Import the Complete Pokedex
    3- Filter the pokedex to exclude the index number
    4- Create a new array withtout the selected pokemon
    5- Return the array
*/
const pokeDelete =()=>{
    pokeGet();
};
pokeDelete();