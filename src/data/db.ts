import mongoose from "mongoose"
require('dotenv').config()

// db connection
const connectDB = () => {
    const connectionURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PW}@the-conspi-wikidb.q76wm.mongodb.net/?retryWrites=true&w=majority`
    mongoose
        .connect(connectionURI)
        .then(() => console.log('Database Connected , access granted '))
        .catch((e) => console.log(`An error occurred: ${e}`))

}

export default connectDB