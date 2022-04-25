const { Schema } = require('mongoose');

const bookSchema = new Schema({
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