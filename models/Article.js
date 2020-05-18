const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const ArticleSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
    },
    videoLink: {
        type: String,
    },
    imageLink: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = Article = mongoose.model("articles", ArticleSchema);
