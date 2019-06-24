const express = require("express");
const database = require("./util/database");
const app = express();
const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const routes = require("./routes");
const middleware = require("./middleware");

database.database();
app.use(bodyParser.json());
app.use(express.static("public"));
//CORS allow all origins, specific methods and specific headers
app.use(middleware.cors);
app.use("/user", routes.user);
app.use("/home", routes.home);
app.use("/game", routes.game);
app.use("/profile", routes.profile);
app.use("/standings", routes.standings);
app.use("/result", routes.result);
app.use((req, res, next) => {
  res.status(404).send("ooops wrong URL");
  next();
});
// //
// const personRoute = require("./routes/person");
// const customerRoute = require("./routes/customer");
// app.use("/someroute", personRoute);
// app.use(customerRoute);
//
// //

// //404 not found url

// });

// //500 enternal server eror middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.sendFile(path.join(__dirname, "../public/500.html"));
// });
app.listen(PORT, () => console.log(`Server listens on port ${PORT}`));

//fetch
//fetch('url-a')
//  .then((response)=>
//  res.json();
//)
//  .then((result)=>{do something with result})
//  .catch((err)=>{})
