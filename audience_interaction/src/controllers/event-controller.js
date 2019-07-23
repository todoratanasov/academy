const EventModel = require("../models/Event");
const MessageModel = require("../models/Message");
module.exports = {
  registerEventPost: (req, res) => {
    //TODO to create the event and return the ID of the created event to the front-end
    const { name, description, creator } = req.body;
    EventModel.create({
      name,
      description,
      creator
    })
      .then(async event => {
        res.status(201).json({
          eventId: event._id
        });
      })
      .catch(err => {
        console.log(err);
        res.status(409).json({
          message: `There is a problem with registering an event ${err}`
        });
      });
  },
  eventGet: (req, res) => {
    const _id = req.params.id.substr(1);
    EventModel.findById({ _id })
      .populate("creator")
      .populate({ path: "messages", populate: { path: "sender" } })
      .then(async result => {
        const mappedMessages = await result.messages.filter(message => {
          if (message.isActive) {
            return message;
          }
        });
        res.status(201).json({
          eventName: result.name,
          eventDescription: result.description,
          creatorName: result.creator.username,
          creatorId: result.creator._id,
          messages: mappedMessages
        });
      })
      .catch(err => {
        console.log(err);
        res.status(404).json({
          message: `There was an error from retreiving the event data - ${err}`
        });
      });
  },
  activeEventsGet: (req, res) => {
    EventModel.find({})
      .then(async eventsDb => {
        const mappedEvents = await eventsDb.filter((event)=>{
          if(event.isActive){
            return event;
          }
        })
        res.status(201).json({
          mappedEvents
        });
      })
      .catch(err => {
        console.log(err);
        res.status(401).json({
          message: `There was an error from retreiving all events - ${err}`
        });
      });
  }
};
