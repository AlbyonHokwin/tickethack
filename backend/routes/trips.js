const express = require('express');
const router = express.Router();

const Trip = require('../models/trips');

router.get('/search/:departure&:arrival&:day', (req, res) => {
    let {departure, arrival, day} = req.params;
    day = new Date(day);
    let nextDay = new Date(day.getTime() + 1000*3600*24);

    Trip.find({
        departure: {$regex: new RegExp(departure, "i")},
        arrival: {$regex: new RegExp(arrival, "i")},
        date: {$gt: day, $lt: nextDay},
    }).then(trips => {
        if (trips[0]) {
            trips.sort((tripA, tripB) => tripA.date - tripB.date);
            res.json({result: true, trips})
        } else {
            res.json({result: false, error: "No trip match search"});
        }
    });
});

module.exports = router;