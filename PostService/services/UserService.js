const User = require("../models/User");
const UserService = {
    async create(user_id, first_name, last_name) {
        const user = await (
            new User({
                _id: user_id,
                first_name,
                last_name
            })
        ).save()

        return user;
    },

}


module.exports = UserService;