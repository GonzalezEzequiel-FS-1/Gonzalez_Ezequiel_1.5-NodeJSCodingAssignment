const express = require("express");
const router = express.Router();
const routes = require("./routes");

// `localhost:3001/api/`
router.get("/", (req, res)=>{
    res
    .status(200)
    .json(
        {
            success:true,
            message: "Testing server works"
        }
    );
});
router.use("/", routes);

module.exports = routes;

//Done