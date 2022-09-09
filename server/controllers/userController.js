const User = require('../models/User');

class UserController {
    async createUser(reg, res, next) {
        const newUser = new User(reg.body);

        try {
            const savedUser = await newUser.save();
            res.status(200).json(savedUser);
        } catch (e) {
            next(e)
        }
    }

    async upDatedUser(reg, res, next) {
        try {
            const upDatedUser = await User.findByIdAndUpdate(
                reg.params.id,
                { $set: reg.body },
                { new: true }
            );
            res.status(200).json(upDatedUser);
        } catch (e) {
            next(e)
        }
    }

    async deleteUser(reg, res, next) {
        try {
            await User.findByIdAndDelete(reg.params.id);
            res.status(200).json("Hotel has been deleted");
        } catch (e) {
            next(e)
        }
    }

    async getUser(reg, res, next) {
        try {
            const user = await User.findById(reg.params.id);
            res.status(200).json(user);
        } catch (e) {
            next(e)
        }
    }


    async getAllUsers(reg, res) {
        try {
            const users = await User.find();
            res.status(200).json(users);
        } catch (e) {
            res.status(500).json(e)
        }
    }

}

module.exports = new UserController();