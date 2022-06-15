require("dotenv").config();
const express = require("express");
const mongoose = require('mongoose');
const app = express();
const cookieParser = require("cookie-parser");
const cors = require("cors");
const AuthRouter = require("./routes/auth");
const APIRouter = require("./routes/api")

app.set("trust proxy", 1)
app.use(cookieParser());
app.use(cors({
  credentials: true,
  origin: process.env.SERVER_CLIENT_URL
}));
app.use(express.json())

/* app.use((req, res, next) => {   
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
}); */

app.use("/auth", AuthRouter);
app.use("/api", APIRouter);

mongoose.connect(process.env.SERVER_MONGO_URL, { 
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true 
}).then(() => {
  console.log('Database Connected Successfully')
}).catch((err) => console.error(err));


/**
  REACT & EXPRESS
  JUST DO 'NPM RUN BUILD' AND THIS, ALSO CHANGE ENV VARIABLES
*/
app.use(express.static("./client/build"))

app.get("/", (req, res, next) => {
  //res.sendFile(path.resolve(__dirname, "./client", "build", "index.html"))
  res.sendFile(path.join(__dirname, './client/build/index.html'))
})

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  })
})

app.listen(process.env.PORT, () => {
  console.log("App is listening on port " + process.env.PORT);
});