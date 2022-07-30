const mongoose = require('mongoose');
const { Schema } = mongoose;

const questionSchema = new Schema({

    question: {
        type: String,
        required: true,
    },

    answer1: {
        isTrue: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            required: true,
        },
    },
    answer2: {
        isTrue: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            required: true,
        },
    },
    answer3: {
        isTrue: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            required: true,
        },
    },
    answer4: {
        isTrue: {
            type: Boolean,
            default: false,
        },
        text: {
            type: String,
            required: true,
        },
    },

    created: {
        type: Date,
        default: Date.now,
    },
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;