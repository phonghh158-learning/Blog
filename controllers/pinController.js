const pinSchema = require('../models/pin');

module.exports = {
    CreatePin: async function(postId, user) {
        try {
            let newPin = new pinSchema({
                post: postId,
                user: user._id,
            });
            return await newPin.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },
    
    GetAllPins: async function() {
        try {
            return await pinSchema.find().populate('post').populate('user');
        } catch (error) {
            throw new Error(error.message);
        }
    },

    GetPinByID: async function(id) {
        try {
            let pin = await pinSchema.findById(id).populate('post').populate('user');
            if (!pin) {
                throw new Error("Pin không tồn tại");
            }
            return pin;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    DeletePin: async function(id) {
        try {
            let pin = await pinSchema.findById(id);
            if (!pin) {
                throw new Error("Pin không tồn tại");
            }
            return await pinSchema.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(error.message);
        }
    },

    IsPinned: async function(postId, userId) {
        try {
            let pin = await pinSchema.findOne({ post: postId, user: userId });
            return pin;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};
