import mongoose from "mongoose"

const TicketSchema = new mongoose.Schema({
    name: String,
    email: String,
    topic: String,
    type: String,
    subject: String,

})

const Tickets = mongoose.model('tickets', TicketSchema)

export default Tickets