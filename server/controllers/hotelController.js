const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

class HotelController {
    async createHotel(reg, res, next) {
        const newHotel = new Hotel(reg.body);

        try {
            const savedHotel = await newHotel.save();
            res.status(200).json(savedHotel);
        } catch (e) {
            next(e)
        }
    }

    async upDatedHotel(reg, res, next) {
        try {
            const upDatedHotel = await Hotel.findByIdAndUpdate(
                reg.params.id,
                { $set: reg.body },
                { new: true }
            );
            res.status(200).json(upDatedHotel);
        } catch (e) {
                next(e)
        }
    }

    async deleteHotel(reg, res, next) {
        try {
            await Hotel.findByIdAndDelete(reg.params.id);
            res.status(200).json("Hotel has been deleted");
        } catch (e) {
            next(e)
        }
    }

    async getHotel(reg, res, next) {
        try {
            const hotel = await Hotel.findById(reg.params.id);
            res.status(200).json(hotel);
        } catch (e) {
            next(e)
        }
    }


    async getAllHotels(reg, res) {
        const {min, max, ...other } = reg.query;
        try {
            const hotels = await Hotel.find({
                ...other,
                cheapestPrice: {$gt: min | 1, $lt: max || 999},
            }).limit(reg.query.limit);
            res.status(200).json(hotels);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async countryByCity(reg, res) {
        const cities = reg.query.cities.split(",");
        try {
            const list = await Promise.all(cities.map(city => {
                return Hotel.countDocuments({city: city})
            }));
            res.status(200).json(list);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async countryByType(reg, res) {
        try {
            const hotelCount = await Hotel.countDocuments({type: "hotel"});
            const apartmentCount = await Hotel.countDocuments({type: "apartment"});
            const resortCount = await Hotel.countDocuments({type: "resort"});
            const villaCount = await Hotel.countDocuments({type: "villa"});
            const cabinCount = await Hotel.countDocuments({type: "cabin"});

            res.status(200).json([
                {type: "hotel", count: hotelCount},
                {type: "apartments", count: apartmentCount},
                {type: "resorts", count: resortCount},
                {type: "villas", count: villaCount},
                {type: "cabins", count: cabinCount},
            ]);
        } catch (e) {
            res.status(500).json(e)
        }
    }

    async getHotelRooms(reg, res) {
        try {
            const hotel = await Hotel.findById(reg.params.id);
            const list = await Promise.all(
                hotel.rooms.map((room) => {
                    return Room.findById(room);
                })
            );
            res.status(200).json(list)
        } catch (e) {
            res.status(500).json(e)
        }
    }

}

module.exports = new HotelController();