import express,{ Request,Response, Application } from "express";
import helmet from "helmet";
import cors from "cors"
import path from "path";
import connectDB from './data/db'

// basic config

const app: Application = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(helmet({contentSecurityPolicy: false,}))
app.use(cors({optionsSuccessStatus: 200}))
require('dotenv').config()

// launch DataBase connection 
connectDB()

// view engine + static files
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs')
app.set('views', 'src/views')



// targeting routes
const aboutRoute = require('./routes/about')
const categoriesRoutes = require('./routes/categories')
const supportRoute = require('./routes/support')
const secondaryRoutes = require('./routes/secondary')
const apiRoutes = require('./routes/api')

//middleware
app.use('/about' , aboutRoute)
app.use('/categories', categoriesRoutes)
app.use('/support' , supportRoute)
app.use('/secondarySites', secondaryRoutes)
app.use('/api' , apiRoutes)

app.get('/' ,(req:Request, res: Response) => {
    res.render('index')
})


// server setup
const PORT: string | number  = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`App running on port: ${PORT}`)
})