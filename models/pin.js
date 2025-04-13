let mongoose = require('mongoose');

let pinSchema = new mongoose.Schema({
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'post',
        required: [true, "Bài viết là trường bắt buộc"],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: [true, "Người dùng là trường bắt buộc"],
    },
    pinnedAt: {
        type: Date,
        default: Date.now,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('pin', pinSchema);