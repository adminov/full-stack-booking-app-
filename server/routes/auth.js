const Router = require('express');
const router = new Router();
const useAuthController = require('../controllers/authController');

router.post('/register', useAuthController.registration);
router.post('/login', useAuthController.login);


module.exports = router;