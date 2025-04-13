let mongoose = require('mongoose');
let slugify = require('slugify');

let postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Tiêu đề là trường bắt buộc"],
    },
    content: {
        type: String,
        required: [true, "Nội dung là trường bắt buộc"],
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    status: {
        type: String,
        enum: ["public", "private"],
        default: "public",
    },
    slug: {
        type: String,
        unique: true
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
});

postSchema.pre('save', function(next) {
    if (this.isModified('title')) {
        this.slug = slugify(this.title, {
            lower: true,
            strict: true,
        });
    }
    next();
});


module.exports = mongoose.model('post', postSchema);