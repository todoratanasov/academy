const express = require("express");
const database = require("./util/database");
const app = express();

let http = require("http").Server(app);
let io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const routes = require("./routes");
const middleware = require("./middleware");

//we connect to the database
database.database();
//we make the request parameters easy to use
app.use(bodyParser.json());

//CORS allow all origins, specific methods and specific headers
app.use(middleware.cors);

//we call the express router
app.use("/user", routes.user);
app.use("/event", routes.event);

//we check for a wrong url
app.use((req, res, next) => {
  res.status(404).send("ooops wrong URL");
  next();
});
app.listen(PORT, () => console.log(`Server listens on port ${PORT}`));

io.on("connection", socket => {
  // Log whenever a user connects
  //TODO create a log in the database with usernames that are connected along with the date and time
  console.log("A user is connected");

  // Log whenever a client disconnects from our websocket server
  //TODO add a date and time of the disconection in the DB
  socket.on("disconnect", function() {
    console.log("A user was disconnected");
  });

  // we receive "message" event from the front-end and that is what socket.on listens for and activate this
  // the contents of that message and then echo it back to our client
  socket.on("message", message => {
    //TODO create a model and store the message in the DB. Push the message's _id into the event in the DB. Return to the front-end the message text, username and the _id of the message

    console.log("Message Received: " + message);
    //with io.emit we send the message to all connected sockets
    io.emit("message", { type: "new-message", text: message });
  });

  socket.on("vote", vote => {
    //TODO find the message in the DB and add upvote/downvote. Return to the front-end message _id, upvotes and downvotes
    console.log("Vote Received: " + vote);
    //with io.emit we send the message to all connected sockets
    io.emit("vote", { type: "new-message", text: message });
  });
});

// Initialize our websocket server on port 5001
http.listen(5001, () => {
  console.log("started on port 5001");
});

//link: https://tutorialedge.net/typescript/angular/angular-socket-io-tutorial/
