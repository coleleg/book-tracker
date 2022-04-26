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
            match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, 'You must use a valid email address.'],
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

// hash pass
userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 10;
        this.password = await bcrypt.hash(this.password, saltRounds);
    }

    next();
});

// check pass
userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = model('User', userSchema);

module.exports = User;