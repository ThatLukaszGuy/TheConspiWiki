import  express,{ Request,Response, Router} from "express";
import path from "path";
const router: Router = express.Router();


router.use(express.static(path.join(__dirname, 'public')));

// privacy policy
router.get('/ToS', (req:Request,res:Response) => {
    res.render('secondary/ToS')
});

// redirect
router.get('/thanks', (req:Request,res:Response) => {
    res.render('secondary/thankYou' , {
        msg: '',
        id: '',
        trigger: ''
    })
});

module.exports = router