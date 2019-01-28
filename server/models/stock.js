var mongoose = require('mongoose');

var Stock = mongoose.model('stocks', {
    date: {
        type: String,
        required: true,
        minlength: 1,
    },
    symbol: {
        type: String,
        required: true
    },
    open: {
        type: Number,
        required: true
    },
    close: {
        type: Number,
        required: true
    },
    low: {
        type: Number,
        required: true
    },
    high: {
        type: Number,
        required: true
    },
    volume: {
        type: Number,
        required: true
    },
});

module.exports = {Stock};