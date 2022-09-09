const Router = require('express');
const router = new Router();
const useUserController = require('../controllers/userController');
const useVerifyToToken = require('../utils/verifyToToken');


// router.get('/checkAuthentication', useVerifyToToken.verifyToken, (reg, res, next) => {
//     res.send("Hello user, you are logged in")
// });
//
// router.get('/checkUser/:id', useVerifyToToken.verifyUser, (reg, res, next) => {
//     res.send("Hello user, you are logged in and you can delete your account")
// });
//
// router.get('/checkAdmin/:id', useVerifyToToken.verifyAdmin, (reg, res, next) => {
//     res.send("Hello user, you are logged in and you can delete all accounts")
// });

//UPDATE
router.put('/:id', useVerifyToToken.verifyUser, useUserController.upDatedUser);
//DELETE
router.delete('/:id', useVerifyToToken.verifyUser, useUserController.deleteUser);
//GET
router.get('/:id', useVerifyToToken.verifyUser, useUserController.getUser);
//GET ALL
router.get('/',useVerifyToToken.verifyAdmin, useUserController.getAllUsers);


module.exports = router;