const mongoose = require('mongoose');

const UsersSchema = mongoose.Schema({

    name: {
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
    position: {
        type: String,
        required: false
    },
    memberType: {
        type: String,
        required: true
    }

},
    { collection: 'Members' }
);

module.exports = Member = mongoose.model('Member', UsersSchema);