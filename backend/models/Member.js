const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({

    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    facebook: {
        type: String,
        required: false
    },
    number: {
        type: String,
        required: true
    },
    memberType: {
        type: String,
        required: true
    }

},
    { collection: 'Members' }
);

module.exports = Member = mongoose.model('Member', UsersSchema);