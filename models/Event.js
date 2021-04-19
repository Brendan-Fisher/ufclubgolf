const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    eventDate: {
        type: String,
        required: true,
    },
    createdDate: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    }
},
    {collection: 'Events'}
);

module.exports = ClubEvent = mongoose.model('Event', EventSchema);