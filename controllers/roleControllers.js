let roleSchema = require('../models/role');

module.exports = {
    GetAllRoles: async function() {
        return await roleSchema.find({});
    },

    CreateARole: async function(name, description = "") {
        let newRole = new roleSchema({
            name: name,
            description: description
        });
        return await newRole.save();
    },

    GetRoleById: async function(id) {
        try {
            let role = await roleSchema.findById(id);
            if (!role) {
                throw new Error('Vai trò không tồn tại');
            }
            return role;
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Cập nhật vai trò
    UpdateARole: async function(id, updates) {
        try {
            let role = await roleSchema.findById(id);
            if (!role) {
                throw new Error('Vai trò không tồn tại');
            }

            // Chỉ cập nhật các trường cho phép
            let allowFields = ['name', 'description'];
            for (let key of Object.keys(updates)) {
                if (allowFields.includes(key)) {
                    role[key] = updates[key];
                }
            }

            return await role.save();
        } catch (error) {
            throw new Error(error.message);
        }
    },

    // Xóa vai trò
    DeleteARole: async function(id) {
        try {
            let role = await roleSchema.findByIdAndDelete(id);
            if (!role) {
                throw new Error('Vai trò không tồn tại hoặc đã bị xóa');
            }
            return role;
        } catch (error) {
            throw new Error(error.message);
        }
    }
};