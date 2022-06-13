import  express,{ Request,Response, Router} from "express";
import path from "path";
const router: Router = express.Router();


router.use(express.static(path.join(__dirname, 'public')));

router.get('/ToS', (req:Request,res:Response) => {
    res.sendFile('secondarySites/ToS.html', {root: 'src/public'})
});

router.get('/thanks', (req:Request,res:Response) => {
    res.sendFile('secondarySites/thankYou.html', {root: 'src/public'})
});

module.exports = router