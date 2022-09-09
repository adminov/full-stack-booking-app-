const Router = require('express');
const router = new Router();
const useRoomController = require('../controllers/roomController');
const useVerifyToToken = require('../utils/verifyToToken');


//CREATE
router.post('/:hotelid', useVerifyToToken.verifyAdmin, useRoomController.createRoom);
//UPDATE
router.put('/:id', useVerifyToToken.verifyAdmin, useRoomController.upDatedRoom);
router.put('/availability/:id', useRoomController.upDatedRoomAvailability);

//DELETE
router.delete('/:id/:hotelid', useVerifyToToken.verifyAdmin, useRoomController.deleteRoom);
//GET
router.get('/:id', useRoomController.getRoom);
//GET ALL
router.get('/', useRoomController.getAllRooms);


module.exports = router;