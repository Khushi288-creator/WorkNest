const mongoose = require('mongoose');


const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    workspace: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true
    },
    status: {
        type: String,
        enum: ["active", "completed", "on_hold"],
        default: "active"
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"]
    },
    deadline: {
        type: Date
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

const Project = mongoose.model("Project", projectSchema);

module.exports = Project;