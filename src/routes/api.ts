import  express, {Request,Response, Router} from "express";
import path from "path";

// controllers
const articleController = require('../controllers/articleController')
const teamController = require('../controllers/teamController')
const ticketController = require('../controllers/ticketController')

// const nodeMail = require("nodemailer");
const router: Router = express.Router();
require('dotenv').config()

// to enable patch & delete requests
const methodOverride = require("method-override");
router.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));

router.use(express.static(path.join(__dirname, 'public')));


// actual routing + middleware

// api

router.get('/' , (req:Request,res:Response) => {
    res.render('api')
})

// articles

    // redirect
router.get('/articles', articleController.redirectArticle)

    // find all articles
router.get('/articles/all', articleController.allArticles);

    // find by id
router.get('/articles/:id', articleController.singleArticle)

    // find by category
router.get('/articles/cat/:category', articleController.byCategory)

    // find by author
router.get('/articles/author/:author', articleController.getAuthor)

    // find by source
router.get('/articles/source/:source', articleController.getSource)


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

    // delete ticket    
router.delete('/tickets/delete/:id' , ticketController.deleteTicket)


// team members

    // redirect to about
router.get('/team', teamController.redirectTeam)

    // all team members
router.get('/team/all', teamController.allTeamMembers)

    // find team members by id
router.get('/team/:id',teamController.memberById)





module.exports = router