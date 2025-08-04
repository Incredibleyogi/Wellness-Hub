const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    email: String,
    password_hash: String,
    created_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('User', UserSchema);