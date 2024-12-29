import mongoose from 'mongoose';

const EventSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    eventName: { type: String, required: true },
    startDateTime: { type: Date, required: true },
    endDateTime: { type: Date, required: true },
});

const Event = mongoose.model('Event', EventSchema);

export default Event;