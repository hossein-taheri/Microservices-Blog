const mongoose = require("mongoose");
let mongooseHidden = require('mongoose-hidden')()


const UserSchema = new mongoose.Schema(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        }
    },
    {timestamps: true},
);
UserSchema.plugin(mongooseHidden)

const User = mongoose.model('User', UserSchema);

module.exports = User;