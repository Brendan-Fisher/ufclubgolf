const mongoose = require('mongoose');

const AnnouncementSchema = mongoose.Schema({
    content: {
        type: String,
        required: true
    }
},
    {collection: 'Announcements'}
);

module.exports = Announcement = mongoose.model('Announcement', AnnouncementSchema);