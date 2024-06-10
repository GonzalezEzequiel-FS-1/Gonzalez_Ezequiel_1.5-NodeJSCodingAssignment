const express = require("express");
const router = express.Router();
const getPkmn = require("../misc/modules/getPkmn");
const fs = require("fs");
const path = require("path");
const readArray = require("../misc/modules/pokedex")
let selectedPokemon;

//Get all
router.get("/", async (req, res)=>{
    
    const pokedex = await readArray();
    res
        .status(200)
        .json({
            success:true,
            message:"Complete Pokedex",
            pokedex:pokedex
        })
})
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
                pokemon: selectedPokemon
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
                pokemon: selectedPokemon
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
                pokemon: selectedPokemon
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
                pokemon: selectedPokemon
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

//delete by ID it could be modified as search was but will make the code waaaay to long
router.get("/delete/id/:id", async (req, res) => {
    const pokemonId = parseInt(req.params.id);
    const selectedPkmn = getPkmn(pokemonId, "id");
    if (!selectedPkmn) {
        return res.status(404).send("Pokemon not found");
    }
    // Delete the Pokémon from the Pokédex
    try {
        const pokedex = await readArray();
        const indexToDelete = pokedex.findIndex(pokemon => pokemon.id === pokemonId);
        if (indexToDelete < -1 || indexToDelete == NaN) {
            return res.status(404).send("Who are you looking for, MissingNo?");
        }

        pokedex.splice(indexToDelete, 1);
        console.log(`Deleted Pokemon with ID ${pokemonId}`);
        const newPokedex = Array.from(pokedex)
        fs.writeFileSync(path.join(__dirname, "../misc/jsonFiles/pokedex.json"), JSON.stringify(newPokedex, null, 2));

        return res.status(200).json(newPokedex);
    } catch (error) {
        console.error(`There was a problem deleting the pokemon \n ${error}`);
        return res.status(500).send("Internal Server Error");
    }
});

//POST
router.post("/create", async (req, res) => {
    const newPokemon = {
        id: req.body.id || null,
        num: req.body.num || '',
        name: req.body.name || '',
        img: req.body.img || '',
        type: req.body.type || [],
        height: req.body.height || '',
        weight: req.body.weight || '',
        weaknesses: req.body.weaknesses || [],
        prev_evolution: req.body.prev_evolution || [],
        next_evolution: req.body.next_evolution || []
    };
    const requiredFields = ['id', 'num', 'name', 'img', 'type', 'height', 'weight', 'weaknesses'];
    const missingFields = requiredFields.filter(field => !newPokemon[field]);

    if (missingFields.length > 0) {
        return res.status(400).json({
            error: `Please make sure to include the following data: ${missingFields.join(', ')}`
        });
    }
    try {
        const pokedex = await readArray();
        pokedex.push(newPokemon);
        const newPokedex = Array.from(pokedex)
        fs.writeFileSync(path.join(__dirname, "../misc/jsonFiles/pokedex.json"), JSON.stringify(pokedex, null, 2));
        return res
            .status(200)
            .json({
                message: "New Pokemon Added",
                newPokemon: newPokemon
            })
    } catch (error) {
        console.error(`Error while adding new Pokemon ${error}`);
        return res
            .status(500)
            .send("Internal Server Error");
    }
    /*
    here is a sample of the data to provide:
    {
        "id": 152,
        "num": "152",
        "name": "Flamzard",
        "img": "https://example.com/flamzard.png",
        "type": ["Fire", "Flying"],
        "height": "1.5 m",
        "weight": "40.0 kg",
        "weaknesses": ["Water", "Electric", "Rock"],
        "prev_evolution": [],
        "next_evolution": [
            {
            "num": "153",
            "name": "Infernozard"
            }
        ]
}
    */
})




module.exports = router;