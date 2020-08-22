const Booking = require('../models/Booking');

module.exports = {
    async create(req, resp) {
        try { 
            const io = req.io
            const { booking_id } = req.params
            
            const booking = await Booking.findById(booking_id)

            if (!booking) {
                return resp.status(404).
                    json({
                        type: "error",
                        message: "reserva não encontrada",
                    })
            }
           

            booking.aproved = true

            await booking.populate('spot').execPopulate()
            await booking.save()

            return resp.status(200).
                json({
                    type: "success",
                    message: "reserva rejeitada",
                    booking
                })
        } catch (err) {
            console.log(err)
            return resp.status(400).json({
                type: "error",
                message: err.message
            })
        }
    }
}