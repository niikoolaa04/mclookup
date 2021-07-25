const express = require("express");
require('dotenv')
const app = express();
const cookieParser = require("cookie-parser");
const AuthRouter = require("./auth.js");
const { Database } = require('quickmongo');
const config = require("../config.json");
const path = require("path")
app.use(cookieParser());

app.use("/auth", AuthRouter);

const db = new Database(config.mongodb);

db.on("ready", () => {
  console.log("Database connected!");
});

// app.use(express.static(path.join(__dirname, '../../build')));

// app.get('*', (req,res) =>{
//   res.sendFile(path.join(__dirname+'../../build/index.html'));
// });

app.listen("3009", () => {
  console.log("Your app is listening on port 3009");
});