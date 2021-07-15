const mongoose = require('mongoose')
const Blog = require('./blog')

const commentSchema = new mongoose.Schema({
	blog: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    }, 
    content: {
        type: String,
        required: true,
        trim: true
    },
	author: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})

commentSchema.pre('save', async function (next) {
    const comment = this

	await Blog.findOneAndUpdate({_id :this.blog}, {$inc : {comment_count : 1}});

    next()
})


const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment