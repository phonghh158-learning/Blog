let mongoose = require('mongoose');

let reactionSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ["like", "dislike", "love"],
        required: [true, "kiểu tương tác là trường bắt buộc"],
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    post: {
        type: mongoose.Types.ObjectId,
        ref: 'post',
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('reaction', reactionSchema);