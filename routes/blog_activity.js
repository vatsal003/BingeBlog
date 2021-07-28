const express = require('express')
const Blog = require('../models/blog')
const Like = require('../models/like')
const Comment = require('../models/comment')
const auth = require('../middleware/auth')


// const blog = Blog.findOne({  }).then((err,res)=>{
// console.log(res)	
// })
// console.log(blog)

const router = new express.Router()


// router.get('/blog-like/:id', auth, async (req, res) => {
//     try {
// 		const id = req.params.id
// 		let likes = await Like.find({ user : req.user._id })
// 		if(!likes){
// 			likes = new Like({
// 				user:req.user._id,
// 				blogs:[]
// 			})
			
// 		}
// 		let blog
// 		const liked_blogs = likes.blogs.findIndex(blog=>blog==id)
// 		if (liked_blogs<0){
// 			likes.blogs.push(id)
// 			blog = await Blog.findOneAndUpdate( {_id}, {$inc : {'likes' : 1}}, {new: true}, {projection:"-clicks -content"} )
// 		}
// 		else{
// 			likes.blogs.splice(liked_blogs,1)
// 			 blog = await Blog.findOneAndUpdate( {_id}, {$inc : {'likes' : -1}}, {new: true}, {projection:"-clicks -content"} )
// 		}
// 		//const blog = await Blog.findOneAndUpdate( {_id}, {$inc : {'clicks' : 1}}, {new: true}, {projection:"-clicks"} )

// 		////check
// 		await like.save()
		
		
//         await blog.save()
//         res.status(201).send(blog)
//     } catch (e) {
// 		console.log(e)
//         res.status(400).send(e)
//     }
// })


router.get('/blog-like/:id', auth, async (req, res) => {
    try {
		const id = req.params.id
		//upsert true
		let likes = await Like.findOneAndUpdate({ user : req.user._id }, { $addToSet: { blogs: id } },{upsert:true})

		let blog
		blog = await Blog.findOneAndUpdate( {_id}, {$inc : {'likes' : 1}}, {new: true}, {projection:"-clicks -content"} )
		
// 		{
// 			likes.blogs.splice(liked_blogs,1)
// 			 blog = await Blog.findOneAndUpdate( {_id}, {$inc : {'likes' : -1}}, {new: true}, {projection:"-clicks -content"} )
// 		}
        res.status(201).send(blog)
    } catch (e) {
		console.log(e)
        res.status(400).send(e)
    }
})



router.get('/blog-unlike/:id', auth, async (req, res) => {
    try {
		const id = req.params.id
		//upsert true
		let likes = await Like.findOneAndUpdate({ user : req.user._id }, { $pull: { blogs: id } })

		let blog
		blog = await Blog.findOneAndUpdate( {_id}, {$inc : {'likes' : -1}}, {new: true}, {projection:"-clicks -content"} )
        res.status(201).send(blog)
    } catch (e) {
		console.log(e)
        res.status(400).send(e)
    }
})

router.post('/blog-comment', auth, async (req, res) => {
    try {
		const id = req.body.id
		const content = req.body.content
		//upsert true
		let comment = await Comment.findOneAndUpdate({ blog : id }, { $push: { comments: { content: content , author:req.user._id } } } ,{upsert:true})

		
	 
	 
		let blog
		blog = await Blog.findOneAndUpdate( {_id}, {$inc : {'comment_count' : 1}}, {new: true}, {projection:"-clicks -content"} )
		
		// {
		// 	likes.blogs.splice(liked_blogs,1)
		// 	 blog = await Blog.findOneAndUpdate( {_id}, {$inc : {'likes' : -1}}, {new: true}, {projection:"-clicks -content"} )
		// }
        res.status(201).send(blog)
    } catch (e) {
		console.log(e)
        res.status(400).send(e)
    }
})


router.get('/blog-comments/:id', async (req, res) => {
    try {
		const _id = req.params.id;
        //const blog = await Blog.findOne({ _id })
		const comments = await Comment.find( {blog:_id} )
        res.status(200).send(comments)
    } 
	catch (e) {
		//console.log(e)
        res.status(400).send(e)
    }
})


module.exports = router
