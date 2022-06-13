import  express, {Request,Response, Router} from "express";
import path from "path";
import Articles from "../models/ArticleModel";
import Tickets from "../models/TicketModel";
import Teams from "../models/TeamMemberModel";


// const nodeMail = require("nodemailer");
const filterJson = require('json-schema-filter-js');
const router: Router = express.Router();
require('dotenv').config()

router.use(express.static(path.join(__dirname, 'public')));

// api

router.get('/' , (req:Request, res:Response) => {
    res.render('api')
})

// articles

    // find all articles
router.get('/articles', (req:Request, res:Response) => {
    Articles.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(data)
        }
    })
});

    // find by id
router.get('/articles/single/:id', (req:Request, res:Response) => {
    Articles
    .findById(req.params.id)
    .then((article) => res.status(200).send(article))
    .catch((err) => res.status(500).send(`We couldn't find the specified id , Error: ${err}`))
})

    // find by category
router.get('/articles/cat/:category',(req: Request, res: Response) => {
	Articles.find({category: req.params.category},(err:any,data:any) => {
        const currentRoute =  req.params.category;
        const availableRoutes = '[ US Government, Futuristic ,Historical ,Pharmaceutical ,Aliens , Hacking ,Ancient ,Mythical ,Antarctica ,Space ,Other ]'
        if (err) {
            res.send(`We couldn't find the specified category of: " ${currentRoute} " try one from the availabe list ${availableRoutes}, Error: ${err}`)
        } else if (data.length == 0) {
            res.send(`We couldn't find the specified category of: " ${currentRoute} " try one from the availabe list ${availableRoutes}, Error: ${err}`)
        }
         
        else {
             res.status(200).json(data)
        }})
})


// tickets

    // get all 
router.get('/tickets', (req:Request, res:Response) => {
    Tickets.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            const hidePrivate = data.map(i => [i.type, i.topic, i.subject, i._id] )
            const filtered = filterJson(Tickets ,hidePrivate)
            res.send(filtered)
        }
    })
})

    // find by id
router.get('/tickets/:id', (req:Request, res:Response) => {
    Tickets
    .findById(req.params.id)
    .then((ticket) => {
        const hidePrivate = [ticket.type, ticket.topic, ticket.subject, ticket._id]
        const filtered = filterJson(Tickets ,hidePrivate)
        res.status(200).send(filtered)
    }
    )
    .catch((err) => res.status(500).send(`We couldn't find the specified id , Error: ${err}`))
})

    // upload tickets + mail


        // post route write to db
router.post('/tickets' , async (req:Request, res:Response) => {
    const { name, email, topic,type, subject } = req.body
    const newTicket = new Tickets({
        name: name,
        email: email,
        topic: topic,
        type: type,
        subject: subject,
    })
    newTicket.save().then(() => console.log('ticket saved succesfully'))

    res.redirect('/secondarySites/thanks')
})

// team members

    // all team members
router.get('/team', (req: Request, res: Response) => {
	Teams.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            const hidePrivate = data.map((i:any) => [i.name , i.desc, i.links.github, i.links.instagram, i.links.twitter, i.links.facebook , i._id ])
            const filtered = filterJson(Tickets ,hidePrivate)
            res.status(200).send(filtered)
        }
    })
})

    // find team members by id
router.get('/team/:id',(req: Request, res: Response) => {
	Teams.findById(req.params.id)
	.then((data) => {
        const hidePrivate = [data.name , data.desc, data.links.github, data.links.instagram, data.links.twitter, data.links.facebook  ]
        const filtered = filterJson(Tickets ,hidePrivate)
        res.status(200).send(filtered)
    })
	.catch((err) => res.status(500).send(err))
})





module.exports = router