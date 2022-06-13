import mongoose from "mongoose"

const ArticleSchema = new mongoose.Schema({
    author: String,
    title: String,
    body: {
        introduction: String,
        main: String,
        conclusion: String
    },
    source: String,
    category: String
})

const Articles = mongoose.model('articles', ArticleSchema)

export default Articles