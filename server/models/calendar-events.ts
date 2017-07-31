import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    //_id : Number,
    date : String,
    note : String
});
const CalendarEvent = mongoose.model('events', eventSchema);

export default CalendarEvent;