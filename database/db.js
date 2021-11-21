const mongoose = require('mongoose');

let connection;

const getConnection = async () => {
    if (!connection) {
        connection = await mongoose.connect('mongodb://localhost/BankingApplication', {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
        });
    }
    return connection;
};

module.exports = {
    getConnection: getConnection
};