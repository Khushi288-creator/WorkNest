const mongoose = require('mongoose');

const SprintSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    goal: {
        type: String
    },
    project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
        required: true
    },
    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    status: {
        type: String,
        enum: ["planned","active","completed"],
        default: "planned"
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Sprint = mongoose.model("Sprint", SprintSchema);

module.exports = Sprint;