const mongoose = require('mongoose');

const PostSchema = mongoose.Schema({
    
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
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
    {collection: 'Posts'}
);

module.exports = Post = mongoose.model('Post', PostSchema);