const express = require("express");
const database = require("./util/database");
const app = express();

let http = require("http").Server(app);
let io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;
const bodyParser = require("body-parser");
const routes = require("./routes");
const middleware = require("./middleware");

const MessageModel = require("./models/Message");
const EventModel = require("./models/Event");

//we connect to the database
database.database();
//we make the request parameters easy to use
app.use(bodyParser.json());

//CORS allow all origins, specific methods and specific headers
app.use(middleware.cors);

//test
app.use("/test", (req, res) => {
  res.json("It works");
});

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
  socket.on("message", async message => {
    //TODO create a model and store the message in the DB. Push the message's _id into the event in the DB. Return to the front-end the message text, username and the _id of the message
    const { content, sender, senderId, eventId } = JSON.parse(message);

    const eventDb = await EventModel.findById(eventId);
    MessageModel.create({
      sender: senderId,
      event: eventId,
      content
    }).then(messageDb => {
      const _id = messageDb._id;
      MessageModel.findById(_id)
        .populate({
          path: "sender"
        })
        .then(messagePopulated => {
          io.emit("message", { type: "new-message", text: messagePopulated });
          eventDb.messages.push(_id);
          eventDb.save();
        });
    });
    console.log("Message Received: " + message);
    //with io.emit we send the message to all connected sockets
  });
  socket.on("delete", async data => {
    const { messageId, eventId } = JSON.parse(data);
    const messageDB = await MessageModel.findById({ _id: messageId });
    messageDB.isActive = false;
    messageDB.save();
    EventModel.findById(eventId)
      .populate("creator")
      .populate({ path: "messages", populate: { path: "sender" } })
      .then(async result => {
        const mappedMessages = await result.messages.filter(message => {
          if (message.isActive) {
            return message;
          }
        });
        const eventData = {
          eventName: result.name,
          eventDescription: result.description,
          creatorName: result.creator.username,
          messages: mappedMessages
        };
        io.emit("delete", { type: "new-message", text: eventData });
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({
          message: `There was an error from retreiving the event data - ${err}`
        });
      });
  });
  socket.on("close", async data => {
    
    const _id = JSON.parse(data).eventId;
    const event=await EventModel.findById({_id});
    event.isActive = false;
    event.save();

    io.emit("close", { type: "new-message", text: false });
  });
});

// Initialize our websocket server on port 5001
http.listen(5001, () => {
  console.log("started on port 5001");
});

//link: https://tutorialedge.net/typescript/angular/angular-socket-io-tutorial/
