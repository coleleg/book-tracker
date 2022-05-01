const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || `mongodb+srv://coleleg:MongoDB123@cluster0.sxprl.mongodb.net/book-tracker?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

module.exports = mongoose.connection;