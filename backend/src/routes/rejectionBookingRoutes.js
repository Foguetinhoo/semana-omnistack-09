const { Router } = require('express')
const rejectedRoute = Router()
const aprovedController =  require('../controllers/ApprovalController')

rejectedRoute.post('/bookings/:booking_id/rejections', aprovedController.create)
module.exports = rejectedRoute;