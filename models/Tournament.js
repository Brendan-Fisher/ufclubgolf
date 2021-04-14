const mongoose = require('mongoose');

const TournamentSchema = mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    startDate: {
        type: String,
        required: true,
    },
    createdDate: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true
    }
},
    {collection: 'Tournaments'}
);

module.exports = Tournament = mongoose.model('Tournament', TournamentSchema);