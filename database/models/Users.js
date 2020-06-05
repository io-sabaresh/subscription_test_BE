const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
    },
    lastName: {
        type: String,
        lowercase: true,
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        trim: true,
        lowercase: true,
        required: 'Email address is required',
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
    },
    password: {
        type: String,
        trim: true,
    },
    userType: {
        type: String,
        trim: true,
        lowercase: true,
        enum: ["super-admin", "shop-owner", "customer"],
        default: "customer"
    }
}, {
    timestamps: true
});

UserSchema.index({ email: 1 });

module.exports = mongoose.model('User', UserSchema);