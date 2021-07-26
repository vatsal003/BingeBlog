const mongoose = require('mongoose')
const Blog = require('./blog')

const likeSchema = new mongoose.Schema({
	blogs: [{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Blog'
    }], 
	user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

// likeSchema.pre('save', async function (next) {
//     const like = this

// 	await Blog.findOneAndUpdate({_id : this.blogs[(this.blogs.length)-1]}, {$inc : {likes : 1}});

//     next()
// })


const Like = mongoose.model('likes', likeSchema)

module.exports = Like