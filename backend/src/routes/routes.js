const {Router} = require('express')
const routes = Router();

const spotRoutes = require('./spotRoutes')
const bookingRoutes = require('./bookingRoutes')
const dashboardRoutes = require('./dashboardRoutes')
const sessionRoutes = require('./sessionRoutes')
const approvedRoutes =  require('./approvalBookingRoutes')
const rejectionRoutes =  require('./rejectionBookingRoutes')

module.exports = routes.use([spotRoutes, bookingRoutes, dashboardRoutes, sessionRoutes,approvedRoutes,rejectionRoutes]);