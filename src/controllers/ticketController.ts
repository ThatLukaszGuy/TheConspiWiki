import Tickets from "../models/TicketModel";
import  {Request,Response} from "express";
const nodemailer = require('nodemailer')
const filterJson = require('json-schema-filter-js');

// mail config
const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com", // hostname
    secureConnection: false, // TLS requires secureConnection to be false
    port: 587, // port for secure SMTP
    tls: {
        ciphers:'SSLv3'
    },
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PW
    }
});


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
        .then(() => {
            // setup e-mail data
            const mailOptions = {
                from: `"The Conspi Wiki " <${process.env.MAIL_USER}>`, // sender address
                to: newTicket.email, // receiver
                subject: `Hello ${newTicket.name}`, // Subject line
                text: 'We have successfully created your ticket, access all details/modify/delete it at "/api/tickets/YOURNAME/YOURID"', // plaintext body
                html: `We have <b>successfully</b> created your ticket,
                       <br> 
                       access all details/modify/delete it at /api/tickets/YOURNAME/YOURID
                       <br>
                       <b>All details</b>
                       <ul>
                        <li>Name: <b>${newTicket.name}</b></li>
                        <li>Email: <b>${newTicket.email}</b></li>
                        <li>ID: <b>${newTicket._id}</b></li>
                        <li>Topic: <b>${newTicket.topic}</b></li>
                        <li>Subject: <b>${newTicket.subject}</b></li>
                       </ul>
                       ` // html body
            };
            transporter.sendMail(mailOptions, function(error:any, info:any){
                if(error){
                    return console.log(error);
                }
            
                console.log('Message sent: ' + info.response);
            });

        })
}

// update ticket
exports.updateUser = (req:Request, res:Response) => {
    const id = req.params.id
    Tickets
        .findByIdAndUpdate(id, req.body, { new : true})
        .then((data) => {
                    // setup e-mail data
                    const mailOptions = {
                            from: `"The Conspi Wiki " <${process.env.MAIL_USER}>`, // sender address
                            to: data.email, // receiver
                            subject: `Hello ${data.name}`, // Subject line
                            text: 'We have successfully updated your ticket, access all details/modify/delete it at "/api/tickets/YOURNAME/YOURID"', // plaintext body
                            html: `We have <b>successfully</b> updated your ticket,
                                   <br> 
                                   access all details/modify/delete it at /api/tickets/YOURNAME/YOURID
                                   <br>
                                   <b>All *updated* details</b>
                                   <ul>
                                    <li>Name: <b>${data.name}</b></li>
                                    <li>Email: <b>${data.email}</b></li>
                                    <li>ID: <b>${data._id}</b></li>
                                    <li>Topic: <b>${data.topic}</b></li>
                                    <li>Subject: <b>${data.subject}</b></li>
                                   </ul>
                                   ` // html body
                    };
                    transporter.sendMail(mailOptions, (error:any, info:any) => {
                        if(error){
                            return console.log(error);
                        }
                        
                        console.log('Message sent: ' + info.response);
                    });
            
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
