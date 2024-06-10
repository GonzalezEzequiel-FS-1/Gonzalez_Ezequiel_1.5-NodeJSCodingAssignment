const express = require("express");
const morgan = require("morgan");
const app = express();
const routes = require("./routes");


app.use(morgan("dev"));
app.use(express.json());

app.use("/api/pokedex", routes);

app.use("/", (req, res)=>{
    res.status(200).send({
        success:true,
        message:"Connected to the Pokédex Server, Service Up!"
    })
})
module.exports = app;
//Done