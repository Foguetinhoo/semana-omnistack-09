const express = require('express')
const BookingController =  require('../controllers/BookingController')

const bookingRoutes = express.Router()

bookingRoutes.post('/spots/:spot_id/bookings', BookingController.create)

module.exports  =  bookingRoutes