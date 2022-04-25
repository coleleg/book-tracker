const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

const bookSchema = require('./book');

const userSchema = new Schema ({
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'You must use a valid email address.'],
        },
        booksToRead: [bookSchema],
        currentlyReading: [bookSchema],
        booksRead: [bookSchema],
    },
    {
        toJSON: {
            virtuals: true,
        }
});


const User = model('User', userSchema);

module.exports = User;