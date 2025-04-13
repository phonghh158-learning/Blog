const express = require('express');
const router = express.Router();
const reactionController = require('../controllers/reactionController');
const { check_authentication } = require('../utils/check_auth');

//create
router.post('/', check_authentication, async (req, res) => {
    try {
        const { postId, type } = req.body;
        const user = req.user;
        const newReaction = await reactionController.CreateReaction(postId, user, type);
        res.status(201).json({
            success: true,
            data: newReaction,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

//get list
router.get('/', check_authentication, async (req, res) => {
    try {
        const reactions = await reactionController.GetAllReactions();
        res.status(200).json({
            success: true,
            data: reactions,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

//get by id
router.get('/:id', check_authentication, async (req, res) => {
    try {
        const reaction = await reactionController.GetReactionByID(req.params.id);
        res.status(200).json({
            success: true,
            data: reaction,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

//updatew
router.put('/:id', check_authentication, async (req, res) => {
    try {
        const { type } = req.body;
        const updatedReaction = await reactionController.UpdateReaction(req.params.id, type);
        res.status(200).json({
            success: true,
            data: updatedReaction,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


//delete
router.delete('/:id', check_authentication, async (req, res) => {
    try {
        const deletedReaction = await reactionController.DeleteReaction(req.params.id);
        res.status(200).json({
            success: true,
            message: "Tương tác đã được xóa thành công",
            data: deletedReaction,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

//postid reacted
router.get('/isReacted/:postId', check_authentication, async (req, res) => {
    try {
        const isReacted = await reactionController.IsReacted(req.params.postId, req.user);
        res.status(200).json({
            success: true,
            data: isReacted,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
