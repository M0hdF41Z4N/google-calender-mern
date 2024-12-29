const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    eventName: { type: String, required: true },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
});

module.exports = mongoose.model('Event', EventSchema);
