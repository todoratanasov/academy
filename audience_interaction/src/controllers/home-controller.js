const EventModel = require("../models/Event");

module.exports = {
  allEventsGet: (req, res) => {
    EventModel.count({}, (err, count) => {
      const number = count.toString().padStart(8, "0");
      res.status(201).json({
        events: number
      });
    });
  }
};
