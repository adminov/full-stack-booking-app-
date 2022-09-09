const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
    async registration(reg, res, next) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(reg.body.password, salt);

        try {
            const newUser = new User({
                ...reg.body,
                password: hash
            });

            await newUser.save();
            res.status(200).send("User has been created")
        } catch (e) {
            next(e)
        }
    }

    async login(reg, res, next) {
        try {
            const user = await User.findOne({username: reg.body.username});
            if (!user) return next(Error("User not found"));

            const isPasswordCorrect = await bcrypt.compare( reg.body.password, user.password);
            if (!isPasswordCorrect)
                return next(Error("Wrong password or username"));

            const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.SECRET_KEY);
            const { password, isAdmin, ...otherDetails } = user._doc;
            res.cookie("ok_token", token, {
                httpOnly: true,
            }).status(200).json({details: {...otherDetails}, isAdmin})
        } catch (e) {
            next(e)
        }
    }
}

module.exports = new AuthController();