var express = require('express');
var router = express.Router();
var roleController = require('../controllers/roleControllers');
let constants = require('../utils/constants');
let { check_authentication, check_authorization } = require('../utils/check_auth');

let { CreateSuccessResponse, CreateErrorResponse } = require('../utils/responseHandler');

// Lấy danh sách các vai trò
router.get('/', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
    try {
        let roles = await roleController.GetAllRoles();
        CreateSuccessResponse(res, 200, roles);
    } catch (error) {
        CreateErrorResponse(res, 404, error.message);
    }
});

// Tạo một vai trò mới
router.post('/', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
    try {
        let body = req.body;
        let newRole = await roleController.CreateARole(body.name, body.description);
        CreateSuccessResponse(res, 200, newRole);
    } catch (error) {
        CreateErrorResponse(res, 404, error.message);
    }
});

// Cập nhật vai trò
router.put('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
    try {
        let updates = req.body;
        let updatedRole = await roleController.UpdateARole(req.params.id, updates);
        CreateSuccessResponse(res, 200, updatedRole);
    } catch (error) {
        CreateErrorResponse(res, 404, error.message);
    }
});

// Xóa vai trò
router.delete('/:id', check_authentication, check_authorization(constants.ADMIN_PERMISSION), async function (req, res, next) {
    try {
        let deletedRole = await roleController.DeleteARole(req.params.id);
        CreateSuccessResponse(res, 200, deletedRole);
    } catch (error) {
        CreateErrorResponse(res, 404, error.message);
    }
});

module.exports = router;