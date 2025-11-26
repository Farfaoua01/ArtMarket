const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
        type: String,
        enum: ['customer', 'admin'],
        default: 'custumer',
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    pictureurl: { type: String },
    phone: {
        type: String
    }
});
const UserModel = mongoose.model('userCollection', userSchema);
module.exports = UserModel;