const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
    type: String
    },
    role: {
        type: String,
        enum: ["owner", "project_manager", "team_member", "client"],
        default: "team_member"
    },
    avatar: {
        type: String,
        default:""
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
