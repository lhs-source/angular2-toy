import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    //_id : Number,
    date : Date,
    note : String
});
const CalendarEvent = mongoose.model('events', eventSchema);

export default CalendarEvent;