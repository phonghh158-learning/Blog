let postSchema = require('../models/post');

module.exports = {
    GetAllPosts: async function() {
        return await postSchema.find({ isDeleted: false }).populate('author');
    },

    GetPostByID: async function(id) {
        let post = await postSchema.findOne({ _id: id, isDeleted: false }).populate('author');
        if (!post) {
            throw new Error("Bài viết không tồn tại");
        }
        return post;
    },

    CreatePost: async function(title, content, user, status) {
        try {
            let newPost = new postSchema({
                title: title,
                content: content,
                author: user._id,
                status: status || "public",
            });
            return await newPost.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    UpdatePost: async function(id, data) {
        let allowFields = ["title", "content", "status"];
        let post = await postSchema.findById(id);
        if (!post) {
            throw new Error("Bài viết không tồn tại");
        }

        for (let key of Object.keys(data)) {
            if (allowFields.includes(key)) {
                post[key] = data[key];
            }
        }

        return await post.save();
    },

    SoftDeletePost: async function(id) {
        let post = await postSchema.findById(id);
        if (!post || post.isDeleted) {
            throw new Error("Bài viết không tồn tại hoặc đã bị xóa mềm");
        }
        post.isDeleted = true;
        return await post.save();
    },

    RestorePost: async function(id) {
        let post = await postSchema.findById(id);
        if (!post || !post.isDeleted) {
            throw new Error("Bài viết không tồn tại hoặc chưa bị xóa");
        }
        post.isDeleted = false;
        return await post.save();
    }
};
