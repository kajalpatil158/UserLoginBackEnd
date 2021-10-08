const mongoose = require('mongoose');

function dbconnection() {
    mongoose.promise;
    const url = 'mongodb://localhost:27017/login';
    mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose.connection.asPromise()
        .then(() => {
            console.log("Successfully connected to the database");
        }).catch(err => {
            console.log('Could not connect to the database. Exiting now...', err);
            process.exit();
        });
}
module.exports = dbconnection;