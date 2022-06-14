import  express, {Request,Response, Router} from "express";
import path from "path";
import Tickets from "../models/TicketModel";

// controllers
const articleController = require('../controllers/articleController')
const teamController = require('../controllers/teamController')
const ticketController = require('../controllers/ticketController')

// const nodeMail = require("nodemailer");
const filterJson = require('json-schema-filter-js');
const router: Router = express.Router();
require('dotenv').config()

// to enable patch & delete requests
const methodOverride = require("method-override");
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

router.use(express.static(path.join(__dirname, 'public')));

// api

router.get('/' , (req:Request,res:Response) => {
    res.render('api')
})

// articles

    // find all articles
router.get('/articles/all', articleController.allArticles);

    // find by id
router.get('/articles/single/:id', articleController.singleArticle)

    // find by category
router.get('/articles/cat/:category', articleController.byCategory)

    // add search by author at articles/author/:author
    // maybe also by source


// tickets

    // redirect
router.get('/tickets', ticketController.redirectTickets )

    // get all 
router.get('/tickets/all', ticketController.getAll)

    // find by id
router.get('/tickets/:id', ticketController.getById)

    // find by id and name for config
router.get('/tickets/:name/:id', ticketController.getByNameAndId)

    // upload tickets + mail
        // post route write to db
router.post('/tickets' , ticketController.uploadTicket)

    // patch ticket only by user
router.patch('/tickets/update/:id', ticketController.updateUser)
    // hide all ticket _id's so that only poster can see & save his id and update it
    
router.delete('/tickets/delete/:id' , ticketController.deleteTicket)


// team members

    // redirect to about
router.get('/team', teamController.redirectTeam)

    // all team members
router.get('/team/all', teamController.allTeamMembers)

    // find team members by id
router.get('/team/:id',teamController.memberById)





module.exports = router