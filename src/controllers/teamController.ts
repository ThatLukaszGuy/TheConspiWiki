import Teams from "../models/TeamMemberModel";
import  {Request,Response} from "express";

const filterJson = require('json-schema-filter-js');

// redirect
exports.redirectTeam = (req: Request, res: Response) => {
    res.redirect('/about#sectionn')
}

// all team members
exports.allTeamMembers = (req: Request, res: Response) => {
	Teams.find((err, data) => {
        if (err) {
            res.status(500).send(err)
        } else {
            const hidePrivate = data.map((i:any) => [i.name , i.desc, i.links.github, i.links.instagram, i.links.twitter, i.links.facebook , i._id ])
            const filtered = filterJson(Teams ,hidePrivate)
            res.status(200).json(filtered)
        }
    })
}

// membery by id
exports.memberById = (req: Request, res: Response) => {
	Teams.findById(req.params.id)
	.then((data) => {
        const hidePrivate = [data.name , data.desc, data.links.github, data.links.instagram, data.links.twitter, data.links.facebook  ]
        const filtered = filterJson(Teams ,hidePrivate)
        res.status(200).json(filtered)
    })
	.catch((err) => res.status(500).send(err))
}

// about page
exports.aboutPageRender = (req: Request, res : Response) => {
    Teams.find((err,data) => {
        if (err) {
            res.send(err)
        } else {
            res.render('about' , {
                members: data
            })
        }
    })
    

}