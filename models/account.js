const mongoose = require('mongoose');

//Account Schema
const AccountSchema = new mongoose.Schema({
    client_id: {
        type: String,
        required: true
    },
    balance: {
        type: Number,
        required: true
    },
    alias: {
        type: String,
        required: true
    }
});

const model = mongoose.model('Account', AccountSchema);

module.exports = model;