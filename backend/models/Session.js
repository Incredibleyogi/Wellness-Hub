const mongoose = require('mongoose');
const SessionSchema = new mongoose.Schema({
    user_id: mongoose.Schema.Types.ObjectId,
    title: String,
    tags: [String],
    json_file_url: String,
    status: { type: String, enum: ['draft', 'published'] },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now }
});
module.exports = mongoose.model('Session', SessionSchema);