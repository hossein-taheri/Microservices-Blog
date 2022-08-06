const User = require("../models/User");
const UserService = {
    async create(id, first_name, last_name) {
        const user = await (new User({
            _id: id,
            first_name,
            last_name
        })).save();
    }
}

module.exports = UserService;