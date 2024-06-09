const express = require("express");
const router = express.Router();
const getPkmn = require("../misc/modules/getPkmn")
let selectedPokemon;


//Searching by ID
router.get("/search/id/:id", (req, res) => {
    const id = req.params.id
        selectedPokemon = getPkmn(id, "id");
    if (selectedPokemon) {
        res
            .status(200)
            .json({
                success: true,
                message: "Pokémon Found by ID!",
                pokemon:selectedPokemon
            });
    } else {
        res
            .status(400)
            .json({
                success: false,
                message: "Pokémon not found"
            });
    };

});
// Searching by type
router.get("/search/type/:type", (req, res) => {
    const type = req.params.type;
        selectedPokemon = getPkmn(type, "type");
    if (selectedPokemon) {
        res
            .status(200)
            .json({
                success: true,
                message: "Pokémon Found by Type!",
                pokemon:selectedPokemon
            });
    } else {
        res
            .status(400)
            .json({
                success: false,
                message: "Pokémon not found"
            });
    };

});
// Searching by Name
router.get("/search/name/:name", (req, res) => {
    const name = req.params.name;
        selectedPokemon = getPkmn(name, "name");
    if (selectedPokemon) {
        res
            .status(200)
            .json({
                success: true,
                message: "Pokémon Found by name!",
                pokemon:selectedPokemon
            });
    } else {
        res
            .status(400)
            .json({
                success: false,
                message: "Pokémon not found"
            });
    };

});
// Searching by Weakness
router.get("/search/weakness/:weakness", (req, res) => {
    const weakness = req.params.weakness;
        selectedPokemon = getPkmn(weakness, "weaknesses");
    if (selectedPokemon) {
        res
            .status(200)
            .json({
                success: true,
                message: "Pokémon Found by weakness!",
                pokemon:selectedPokemon
            });
    } else {
        res
            .status(400)
            .json({
                success: false,
                message: "Pokémon not found"
            });
    };

});

module.exports = router;