const express = require("express");
const bodyParser = require("body-parser");
const configDataBase = require("./utils/insertData");

// routes
const userRoute = require("./routes/user.route");
const artistRoute = require("./routes/artist.route");
const albumRoute = require("./routes/album.route");
const libraryRoute = require("./routes/library.route");

// database configuration
configDataBase();

const app = express();
app.use(bodyParser.json());
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

// routes
app.use("/user", userRoute);
app.use("/artist", artistRoute);
app.use("/album", albumRoute);
app.use("/library", libraryRoute);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running at: ${PORT}/`);
});
