const express = require("express");
const database = require("./util/database");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const routes = require("./routes");
const middleware = require("./middleware");
//we connect to the database
database.database();
//we make the request parameters easy to use
app.use(bodyParser.json());
//we send all files in the public folder
app.use(express.static("public"));
//CORS allow all origins, specific methods and specific headers
app.use(middleware.cors);
//we call the express router
app.use("/user", routes.user);
app.use("/home", routes.home);
app.use("/game", routes.game);
app.use("/profile", routes.profile);
app.use("/standings", routes.standings);
app.use("/result", routes.result);
//we check for a wrong url
app.use((req, res, next) => {
  res.status(404).send("ooops wrong URL");
  next();
});
app.listen(PORT, () => console.log(`Server listens on port ${PORT}`));
