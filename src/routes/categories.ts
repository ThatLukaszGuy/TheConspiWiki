import  express, {Router} from "express";
import path from "path";
const router: Router = express.Router();

router.use(express.static(path.join(__dirname, 'public')));
const articleController = require('../controllers/articleController')


// render main category page
router.get('/', articleController.categoryPage);

// render singular article
router.get('/:id', articleController.renderArticle)

module.exports = router