const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const dataSchema = new Schema({
    city: {
        type: String,
        required: true
    },
    min: {
        type: Number,
        required: true
    },
    max: {
        type: Number,
        required: true
    },
    nomMin: {
        type: Number,
        required: true
    },
    nomMax: {
        type: Number,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    } 
});

const dataModel = mongoose.model('Data', dataSchema);

module.exports = dataModel;
