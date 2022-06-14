import Articles from "../models/ArticleModel";
import  {Request,Response} from "express";

// get all articles
exports.allArticles = (req:Request,res:Response) => {
    Articles.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            res.status(200).json(data)
        }
    })
} 

// get single article
exports.singleArticle = (req:Request,res:Response) => {
    Articles
        .findById(req.params.id)
        .then((article) => res.status(200).json(article))
        .catch((err) => res.status(500).send(`We couldn't find the specified id , Error: ${err}`))
} 

// by category
exports.byCategory = (req: Request, res: Response) => {
	Articles.find({category: req.params.category},(err:any,data:any) => {
        const currentRoute =  req.params.category;
        const availableRoutes = '[ US Government, Futuristic ,Historical ,Pharmaceutical ,Aliens , Hacking ,Ancient ,Mythical ,Antarctica ,Space ,Other ]'
        if (err) {
            res.send(`We couldn't find the specified category of: " ${currentRoute} " try one from the availabe list ${availableRoutes}, Error: ${err}`)
        } else if (data.length == 0) {
            res.send(`We couldn't find the specified category of: " ${currentRoute} " try one from the availabe list ${availableRoutes}, Error: ${err}`)
        }
         
        else {
             res.status(200).json(data)
        }})
}