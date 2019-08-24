import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;

const eventSchema = new Schema({
    //_id : Number,
    date : Date,
    toDate : Date,
    title : String,
    note : String,
    loc : [String],
    pic : [String]
});
const CalendarEvent = mongoose.model('events', eventSchema);

export default CalendarEvent;