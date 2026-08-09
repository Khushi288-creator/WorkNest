const mongoose = require('mongoose');

const workspaceSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    members: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },

            role: {
                type: String,
                enum: ["owner", "project_manager", "team_member", "client"]
            }
        }
    ],
    logo: {
        type: String,
        default: ""
    },
    inviteCode: {
        type: String,
        unique: true
    }

});

const Workspace = mongoose.model("Workspace", workspaceSchema);

module.exports = Workspace;
