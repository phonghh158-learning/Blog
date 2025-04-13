const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const { check_authentication } = require('../utils/check_auth');

//get list
router.get('/', check_authentication, async (req, res) => {
    try {
        const posts = await postController.GetAllPosts();
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

//getbydi
router.get('/:id', check_authentication, async (req, res) => {
    try {
        const post = await postController.GetPostByID(req.params.id);
        res.status(200).json({ success: true, data: post });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

//craete
router.post('/', check_authentication, async (req, res) => {
    try {
        const { title, content, status } = req.body;
        const user = req.user;
        const newPost = await postController.CreatePost(title, content, user, status);
        res.status(201).json({
            success: true,
            data: newPost
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
});

//update
router.put('/:id', check_authentication, async (req, res) => {
    try {
        const data = req.body;
        const updatedPost = await postController.UpdatePost(req.params.id, data);
        res.status(200).json({ success: true, data: updatedPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

//soft delete
router.delete('/:id', check_authentication, async (req, res) => {
    try {
        const deletedPost = await postController.SoftDeletePost(req.params.id);
        res.status(200).json({ success: true, data: deletedPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

//restore
router.patch('/restore/:id', check_authentication, async (req, res) => {
    try {
        const restoredPost = await postController.RestorePost(req.params.id);
        res.status(200).json({ success: true, data: restoredPost });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
