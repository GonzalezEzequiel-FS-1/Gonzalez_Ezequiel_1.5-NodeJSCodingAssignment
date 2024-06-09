const http = require("http");
const app = require("./app/app");
const PORT = process.env.PORT || 3001;
const fs = require("fs");
require("dotenv").config();


const get = () => {
    
}
http.createServer(app).listen(process.env.PORT, ()=>{
    console.log(`Server Running on port ${PORT}`)
});