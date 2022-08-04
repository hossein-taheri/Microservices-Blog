const User = require('../models/User')
const UserController = {
    async create(id, first_name, last_name) {
        const $user = await (new User({
            _id: id,
            first_name,
            last_name
        })).save();
    }
}

module.exports = UserController;