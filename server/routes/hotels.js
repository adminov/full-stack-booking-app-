const Router = require('express');
const router = new Router();
const useHotelController = require('../controllers/hotelController');
const useVerifyToToken = require('../utils/verifyToToken');


//CREATE
router.post('/', useVerifyToToken.verifyAdmin, useHotelController.createHotel);
//UPDATE
router.put('/:id', useVerifyToToken.verifyAdmin, useHotelController.upDatedHotel);
//DELETE
router.delete('/:id', useVerifyToToken.verifyAdmin, useHotelController.deleteHotel);
//GET
router.get('/find/:id', useHotelController.getHotel);
//GET ALL
router.get('/', useHotelController.getAllHotels);

router.get('/countByCity', useHotelController.countryByCity);
router.get('/countryByType', useHotelController.countryByType);
router.get('/room/:id', useHotelController.getHotelRooms);

module.exports = router;