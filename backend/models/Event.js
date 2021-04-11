const mongoose = require('mongoose');

const EventSchema = mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    date: {
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