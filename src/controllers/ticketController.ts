import Tickets from "../models/TicketModel";
import  {Request,Response} from "express";

const filterJson = require('json-schema-filter-js');

// redirect
exports.redirectTickets = (req: Request, res: Response) => {
    res.redirect('/api')
}

// get all
exports.getAll = (req:Request, res:Response) => {
    Tickets.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            const hidePrivate = data.map(i => [i.type, i.topic, i.subject] )
            const filtered = filterJson(Tickets ,hidePrivate)
            res.json(filtered)
        }
    })
}

// by id
exports.getById = (req:Request, res:Response) => {
    Tickets
    .findById(req.params.id)
    .then((ticket) => {
        const hidePrivate:Array<String> = [ticket.type, ticket.topic, ticket.subject]
        const filtered = filterJson(Tickets ,hidePrivate)
        res.render('ticket', { data: filtered})
        
    }
    )
    .catch((err) => res.status(500).send(`We couldn't find the specified id , Error: ${err}`))
}

// by id and name for config 
exports.getByNameAndId = (req:Request, res:Response) => {
    Tickets
    .findById(req.params.id)
    .then((ticket) => {
        if (req.params.name != ticket.name || req.params.id != ticket._id) {
            res.send('Invalid data check name and id in url')
        } else {
            const hidePrivate:Array<String> = [ticket.type, ticket.topic, ticket.subject, ticket._id, ticket.name]
            const filtered = filterJson(Tickets ,hidePrivate)
            res.render('ticket', { data: filtered})
        }   
    })
    .catch((err) => res.status(500).send(`We couldn't find the specified id , Error: ${err}`))
}

// write to db
exports.uploadTicket = async (req:Request, res:Response) => {
    const { name, email, topic,type, subject } = req.body
    const newTicket = new Tickets({
        name: name,
        email: email,
        topic: topic,
        type: type,
        subject: subject,
    })
    newTicket
        .save()
        .then(() => {
            console.log('ticket saved succesfully, id: ' + newTicket._id)
        })
        .then(() => {
            res.render('secondary/thankYou', {
                msg: "Ticket created with id of:",
                name: newTicket.name,
                id: newTicket._id,
                trigger: 'yes'
            })
        })
}

// update ticket
exports.updateUser = (req:Request, res:Response) => {
    const id = req.params.id
    Tickets
        .findByIdAndUpdate(id, req.body, { new : true})
        .then((data) => {
            res.redirect(`/api/tickets/${req.body.name}/${id}#ticketList`)    
        }).then(() => console.log('Patched !'))
    
}

// delete ticket
exports.deleteTicket = (req:Request, res:Response) => {
    const id = req.params.id
    Tickets
        .deleteMany({_id: id})
        .then((data) => {
        res.redirect('/')
        })
        .then(() => console.log('Deleted !'))
}
