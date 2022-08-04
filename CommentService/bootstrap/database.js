const mongoose = require('mongoose');

//Connection to DB
mongoose
    .connect(
        "mongodb://" +
        process.env.DB_HOST + ":" +
        process.env.DB_PORT + "/" +
        process.env.DB_DBNAME, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
    .then(() => console.log("Successfully connected to MongoDB."))
    .catch(err => console.error("Connection error", err));
