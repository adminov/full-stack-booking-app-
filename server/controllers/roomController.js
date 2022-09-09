const Room = require('../models/Room');
const Hotel = require('../models/Hotel');

class roomController {
    async createRoom(reg, res, next) {
        const hotelId = reg.params.hotelid;
        const newRoom = new Room(reg.body);

        try {
            const savedRoom = await newRoom.save();
            try {
                await Hotel.findByIdAndUpdate(hotelId, {
                    $push: { rooms: savedRoom._id },
                });
            }catch (e) {
                next(e)
            }
            res.status(200).json(savedRoom)
        } catch (e) {
            next(e)
        }
    }


    async upDatedRoom(reg, res, next) {
        try {
            const updatedRoom = await Room.findByIdAndUpdate(
                reg.params.id,
                { $set: reg.body },
                { new: true }
            );
            res.status(200).json(updatedRoom);
        } catch (err) {
            next(err);
        }
    }

    async deleteRoom(reg, res, next) {
        try {
            const upDatedRoom = await Hotel.findByIdAndUpdate(
                reg.params.id,
                { $set: reg.body },
                { new: true }
            );
            res.status(200).json(upDatedRoom);
        } catch (e) {
            next(e)
        }
    }

    async upDatedRoomAvailability(reg, res, next) {
        try {
            await Room.updateOne(
                {"roomNumbers._id": reg.params.id},
                {
                    $push: {
                        "roomNumbers.$.unavailableDates": reg.body.dates
                    },
                }
            );
            res.status(200).json("room status has been upDated");
        } catch (e) {
            next(e)
        }
    }

    async getRoom(reg, res, next) {
        try {
            const room = await Room.findById(reg.params.id);
            res.status(200).json(room);
        } catch (e) {
            next(e)
        }
    }


    async getAllRooms(reg, res) {
        try {
            const rooms = await Room.find();
            res.status(200).json(rooms);
        } catch (e) {
            res.status(500).json(e)
        }
    }


}

module.exports = new roomController;