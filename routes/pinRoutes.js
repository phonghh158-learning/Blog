const express = require('express');
const router = express.Router();
const pinController = require('../controllers/pinController');
const { check_authentication } = require('../utils/check_auth');

router.post('/', check_authentication, async (req, res) => {
    try {
        const { postId } = req.body;
        const user = req.user;
        const newPin = await pinController.CreatePin(postId, user);
        res.status(201).json({
            success: true,
            data: newPin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.get('/', check_authentication, async (req, res) => {
    try {
        const pins = await pinController.GetAllPins();
        res.status(200).json({
            success: true,
            data: pins,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.get('/:id', check_authentication, async (req, res) => {
    try {
        const pin = await pinController.GetPinByID(req.params.id);
        res.status(200).json({
            success: true,
            data: pin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.delete('/:id', check_authentication, async (req, res) => {
    try {
        const deletedPin = await pinController.DeletePin(req.params.id);
        res.status(200).json({
            success: true,
            message: "Pin đã được xóa thành công",
            data: deletedPin,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.get('/isPinned/:postId', check_authentication, async (req, res) => {
    try {
        const isPinned = await pinController.IsPinned(req.params.postId, req.user._id);
        res.status(200).json({
            success: true,
            data: isPinned,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

module.exports = router;
