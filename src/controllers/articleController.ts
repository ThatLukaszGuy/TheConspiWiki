import Articles from "../models/ArticleModel";
import  {Request,Response} from "express";


// redirect
exports.redirectArticle = (req: Request, res: Response) => {
    res.redirect('/categories')
}

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
        const { category } =  req.params;
        const availableRoutes = '[ US Government, Futuristic ,Historical ,Pharmaceutical ,Aliens , Hacking ,Ancient ,Mythical ,Antarctica ,Space ,Other ]'
        if (err || data.length == 0) {
            res.send(`We couldn't find the specified category of: " ${category} " try one from the availabe list ${availableRoutes}, Error: ${err}`)
        }  else {
             res.status(200).json(data)
        }
    })
}

// by author
exports.getAuthor = (req:Request, res:Response) => {
    Articles.find({author: req.params.author}, (err:any,data:any) => {
        const { author } = req.params
        if (err || data.length == 0) {
            res.send(`We couldn't find the specified author of: " ${author} " please check whether you typed the name correctly, Error: ${err}`)
        } else {
            res.status(200).json(data)
        }
    })
}

// by source - doubt anyone will use this tho
exports.getSource = (req:Request, res:Response) => {
    Articles.find({source: req.params.source}, (err:any,data:any) => {
        const { source } = req.params
        if (err || data.length == 0) {
            res.send(`We couldn't find the specified source of: " ${source} " please check whether you typed the name correctly, Error: ${err}`)
        } else {
            res.status(200).json(data)
        }
    })
}

// category route
exports.renderArticle = (req:Request, res:Response) => {
    Articles.findOne( { _id: req.params.id }, (err:any, data: any) => { // god forgive me
        if (err) {
            res.status(500).send(err)
        } else {
            res.render('article', {
                article: data
            })
        }
    } )
}

// render actual article
exports.categoryPage = (req:Request,res:Response) => {
    Articles.find((err,data) => {
        res.render('categories' , { 
            articles: data 
        })
    })
    
}
