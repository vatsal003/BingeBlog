const mongoose = require('mongoose')
const validator = require('validator')
const Comment = require('./comment')

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    thumbnail: {
        type: String
    },
    thumbnail_id: {
        type: String
    },
    meta: {
        type: String,
        required: true
    },
    time_to_read: {
        type: Number,
        required: true,
        validate(value) {
            if (value < 1) {
                throw new Error('Must be a postive number')
            }
        }
    },
    tags: [{
		type: String,
		required: true
        
    }],
    genre: [{
		type: String,
		required: true
        
    }],
    likes: {
        type: Number,
        default: 0,
    },
    rating: {
        type: Number
        // validate(value) {
        //     if (value < 0) {
                
        //     }
        // }

    }, 
	comment_count: {
		type: Number,
		default: 0
	}, 
	clicks: {
		type: Number,
		default: 0
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



// Delete comments when blog is removed And delete cloudinary resources
blogSchema.pre('remove', async function (next) {
    const blog = this
    await Comment.deleteMany({ blog: blog._id })
    next()
})

const Blog = mongoose.model('blogs', blogSchema)

module.exports = Blog