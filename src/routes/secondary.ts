import  express,{ Request,Response, Router} from "express";
import path from "path";
const router: Router = express.Router();


router.use(express.static(path.join(__dirname, 'public')));

router.get('/ToS', (req:Request,res:Response) => {
    res.render('secondary/ToS')
});

router.get('/thanks', (req:Request,res:Response) => {
    res.render('secondary/thankYou')
});

module.exports = router