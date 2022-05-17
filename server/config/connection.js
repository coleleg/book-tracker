const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://` + process.env.DB_USER + `:` + process.env.DB_PW + `@cluster0.sxprl.mongodb.net/book-tracker?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

module.exports = mongoose.connection;