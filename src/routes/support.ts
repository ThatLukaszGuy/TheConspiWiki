import  express, {Request,Response,Router} from "express";
import path from "path";
const router: Router = express.Router();


router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req:Request,res : Response) => {
    res.render('support')
});

module.exports = router