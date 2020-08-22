const { Router } = require('express')
const approvedRoute = Router()
const RejectController =  require('../controllers/RejectionController')

approvedRoute.post('/bookings/:booking_id/approvals', RejectController.create)
module.exports =  approvedRoute;