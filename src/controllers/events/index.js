//controllers/events/index.js
const getAllEvents = require("./getAllEvents");
const getEventById = require("./getEventById");
const formNewEvent = require("./formNewEvent");
const postNewEvent = require("./postNewEvent");
const deleteEvent = require("./deleteEvent");
const confirmModifyEvent = require("./confirmModifyEvent");

module.exports = {
  getAllEvents,
  formNewEvent,
  postNewEvent,
  deleteEvent,
  getEventById,
  confirmModifyEvent,

};
