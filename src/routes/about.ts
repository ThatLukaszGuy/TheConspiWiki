import  express, {Request,Response} from "express";
import path from "path";
import Teams from "../models/TeamMemberModel";
const router = express.Router();


router.use(express.static(path.join(__dirname, 'public')));

router.get('/', (req: Request, res : Response) => {
    Teams.find((err,data) => {
        if (err) {
            res.send(err)
        } else {
            res.render('about' , {
                members: data
            })
        }
    })
    

});

module.exports = router