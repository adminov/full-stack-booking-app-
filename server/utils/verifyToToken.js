const jwt = require('jsonwebtoken');


class verifyToToken {
    verifyToken = (req, res, next) => {
        const token = req.cookies.ok_token;
        if (!token) {
            return next(Error("You are not authenticated"))
        }

        jwt.verify(token, process.env.SECRET_KEY,
            (error, user) => {
            if (error) return next(Error("Token is not valid!"));
            req.user = user;
            next()
        })
    };


    verifyUser = (req, res, next) => {
        this.verifyToken(req, res, next, () => {
            if (req.user.id === req.params.id || req.user.isAdmin) {
                next()
            } else {
                if (error) return next(Error("You are not authorized"));
            }
        })
    };

    verifyAdmin = (req, res, next) => {
        this.verifyToken(req, res, next, () => {
            if (req.user.isAdmin) {
                next()
            } else {
                if (error) return next(Error("You are not authorized"));
            }
        })
    };

}

module.exports = new verifyToToken();