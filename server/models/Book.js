const { Schema } = require('mongoose');

const bookSchema = new Schema({
    bookId: {
        type: String,
        required: true
    },
    authors: [ 
        {
            type: String
        }
    ],
    title: {
        type: String
    },
    description: {
        type: String
    },
    pageCount: {
        type: Number
    },
    thumbnail: {
        type: String
    },
    buyLink: {
        type: String
    }
});

module.exports = bookSchema;