const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cookieParser = require("cookie-parser");
const AuthRouter = require("./auth.js");
const DBRouter = require("./database.js");
const config = require("../config.json");
const cors = require("cors");
app.use(cookieParser());
app.use(cors());const cors = require("cors");

app.use("/auth", AuthRouter);
app.use("/database", DBRouter);

mongoose.connect(config.mongodb, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true 
}).then(() => console.log('Database Connected')).catch((err) => console.error(err));

// REACT FORWARD
// 
// app.use(express.static(__dirname + '/public'));
// app.get('*', (req,res) => res.sendFile(path.join(__dirname+'/public/index.html')));
// app.listen(3000,() => console.log('Server on port 3000'));

app.listen("3009", () => {
  console.log("Your app is listening on port 3009");
});