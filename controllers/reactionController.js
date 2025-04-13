const reactionSchema = require('../models/reaction');

module.exports = {
    // Tạo tương tác mới
    CreateReaction: async function(postId, user, type) {
        try {
            let existingReaction = await reactionSchema.findOne({
                user: user._id,
                post: postId
            });

            if (existingReaction) {
                throw new Error("Người dùng đãtương tác với bài viết này rồi");
            }

            let newReaction = new reactionSchema({
                type: type,
                user: user._id,
                post: postId,
            });

            return await newReaction.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    UpdateReaction: async function(id, type) {
        try {
            let allowTypes = ["like", "dislike", "love"];
            if (!allowTypes.includes(type)) {
                throw new Error("Loại tương tác không hợp lệ");
            }
    
            let reaction = await reactionSchema.findById(id);
            if (!reaction) {
                throw new Error("tương tác không tồn tại");
            }
    
            reaction.type = type;
            return await reaction.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    GetAllReactions: async function() {
        try {
            return await reactionSchema.find().populate('user').populate('post');
        } catch (error) {
            throw new Error(error.message);
        }
    },

    GetReactionByID: async function(id) {
        try {
            let reaction = await reactionSchema.findById(id).populate('user').populate('post');
            if (!reaction) {
                throw new Error("Tương tác không tồn tại");
            }
            return reaction;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    DeleteReaction: async function(id) {
        try {
            let reaction = await reactionSchema.findById(id);
            if (!reaction) {
                throw new Error("tương tác không tồn tại");
            }
            return await reactionSchema.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    IsReacted: async function(postId, user) {
        try {
            let reaction = await reactionSchema.findOne({ post: postId, user: user._id });
            return reaction;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
