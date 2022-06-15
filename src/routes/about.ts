import  express, {Request,Response,Router} from "express";
import path from "path";
const router: Router = express.Router();

const teamController = require('../controllers/teamController')


router.use(express.static(path.join(__dirname, 'public')));

router.get('/', teamController.aboutPageRender);

module.exports = router