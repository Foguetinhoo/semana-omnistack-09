const Booking =  require('../models/Booking');

module.exports = {
    async create(req,resp){
        try {
            const { date } = req.body;
            const { spot_id } = req.params;
            const { user_id } = req.headers;
            const users = JSON.parse(req.connectedUsers)

            const booking = await Booking.create({
                user: user_id,
                spot: spot_id,
                date
            });

            await booking.populate('spot').populate('user').execPopulate()

            const ownerSocket = users[booking.spot.user]
            if (user_id === ownerSocket) {
                return resp.status(200).json({type:"error",message:"não é possivel realizar"})
            }
            if (ownerSocket) {
                req.io.to(ownerSocket).emit('booking_request',booking)
            }

            return resp.status(200).
                json({
                    type: "success", 
                    message: "reserva criada com sucesso",
                    booking
                })
        } catch (err) {
            console.log(err)
            return resp.status(400).json({
                type: "error",
                message:err.message
            })
        }
    }
}