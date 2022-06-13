import  express, {Request,Response, Router} from "express";
import path from "path";
import mongoose from "mongoose";
import Articles from "../models/ArticleModel";
const router: Router = express.Router();

router.use(express.static(path.join(__dirname, 'public')));


// db connection
const connectionURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@the-conspi-wikidb.q76wm.mongodb.net/?retryWrites=true&w=majority`
mongoose
.connect(connectionURI)
.then(() => console.log('Database Connected , access granted '))
.catch((e) => console.log(`An error occurred: ${e}`))

router.get('/', (req:Request,res:Response) => {
    Articles.find((err,data) => {
        res.render('categories' , { 
            articles: data 
        })
    })
    
});

router.get('/:id', (req:Request, res:Response) => {
    Articles.findOne( { _id: req.params.id }, (err:any, data: any) => { // god forgive me
        if (err) {
            res.status(500).send(err)
        } else {
            res.render('article', {
                article: data
            })
        }
    } )
})

module.exports = router