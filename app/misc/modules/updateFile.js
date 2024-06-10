const fs = require('fs');
const path = require('path')

const updateFile=(file)=>{
    fs.writeFileSync(path.join(__dirname, "../jsonFiles/pokedex.json"), JSON.stringify(file, null, 2));
};

module.exports = updateFile;