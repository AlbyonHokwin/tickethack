const express = require('express');
const router = express.Router();

const { checkBody } = require('../modules/checkBody');

const Trip = require('../models/trips');
const Booking = require('../models/bookings');

// Retrieve all bookings PURCHASED - For booking.html
router.get('/', (req, res) => {
    Booking.find({isPurchased: true})
        .populate('trip')
        .then(bookings => {
            if (bookings[0]) {
                res.json({result: true, bookings});
            } else res.json({result: false, error: "No trip booked"});
        })
});

// Add a new NOT purchased booking - For cart.html
router.post('/new', (req, res) => {
    if (checkBody(req.body, ["departure", "arrival", "date", "price"])) {
        let { departure, arrival, date, price } = req.body;
        date = new Date(+date);
        price = Number(price);
        Trip.findOne({
            departure: {$regex: new RegExp(departure, "i")},
            arrival: {$regex: new RegExp(arrival, "i")},
            date,
            price,
        })
            .then(trip => {
                if (trip) {
                    Booking.findOne({trip: trip._id})
                        .then(booking => {
                            if (booking) res.json({result: false, error: "Trip already bought or put into the cart"});
                            else {
                                const newBooking = new Booking({
                                    trip: trip._id,
                                    isPurchased: false,
                                })
                                newBooking.save().then(newBooking => res.json({result: true, newBooking}));
                            }
                        })
                } else res.json({result: false, error: "No trip found"});
            });
    } else {
        res.json({result: false, error: "Empty field"});
    }
});

// Retrieve all bookings NOT purchased - For cart.html
router.get('/cart', (req, res) => {
    Booking.find({isPurchased: false})
    .populate('trip')
    .then(bookings => {
        if (bookings[0]) {
            res.json({result: true, bookings});
        } else res.json({result: false, error: "No trip in cart"});
    })
});

// Delete selected booking NOT purchased - For cart.html
// Date received in ms
router.delete('/cart/:departure&:arrival&:date&:price', (req, res) => {
    let {departure, arrival, date, price} = req.params;
    date = new Date(+date);
    price = Number(price);

    Trip.findOne({
        departure: {$regex: new RegExp(departure, "i")},
        arrival: {$regex: new RegExp(arrival, "i")},
        date,
        price,
    })
        .then(trip => {
            if (trip) {
                Booking.findOneAndDelete({ trip: trip._id })
                    .then(deletedBooking => res.json({result: !!deletedBooking}));
            }
            else res.json({result: false, error: "Trip not found"});
        });
});

// Switch status of isPurchased field from false to true - Booking move from cart to bookings
// Date received in ms
router.put('/purchased', (req, res) => {
    if (checkBody(req.body, ["departure", "arrival", "date", "price"])) {
        let { departure, arrival, date, price } = req.body;
        date = new Date(+date);
        price = Number(price);
        Trip.findOne({
            departure: {$regex: new RegExp(departure, "i")},
            arrival: {$regex: new RegExp(arrival, "i")},
            date,
            price,
        })
            .then(trip => {
                if (trip) {
                    Booking.findOneAndUpdate({trip: trip._id, isPurchased: false}, {isPurchased: true})
                    .then(updateBooking => {
                        updateBooking ? res.json({result: true, infos: "Trip correctly purchased"}) :
                        res.json({result: false, error: "Trip already bought"});
                    })
                } else res.json({result: false, error: "No trip found"});
            });
    } else {
        res.json({result: false, error: "Empty field"});
    }
});

module.exports = router;