const express = require('express')
const Blog = require('../models/blog')
//const auth = require('../middleware/auth')


const router = new express.Router()

router.get('/blogs/:id', auth, async (req, res) => {
    try {
		const _id = req.params.id;
        const blog = await Blog.findOne({ _id })
        res.status(200).send(blog)
    } 
	catch (e) {
		//console.log(e)
        res.status(400).send(e)
    }
})


router.get('/blogs/:id', auth, async (req, res) => {
    try {
		const _id = req.params.id;
        const blog = await Blog.findOne({ _id })
        res.status(200).send(blog)
    } 
	catch (e) {
		//console.log(e)
        res.status(400).send(e)
    }
})


// // GET /tag?limit=20&skip=60
// // GET /tag?sortBy=createdAt:desc
router.get('/blogs/tags/:tag', auth, async (req, res) => {
    try {
		const options = {}
		// if (req.query.sortBy) {
		// 	const parts = req.query.sortBy.split(':')
		// 	sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
		// }
		if(req.query.limit){
			options.limit = parseInt(req.query.limit)
		}
		
		if(req.query.skip){
			options.skip = parseInt(req.query.skip)			
		}
		const tag = req.params.tag;
		
        const blog = await Blog.find({ "tags" : tag }," -content",options)
        res.status(200).send(blog)
    } 
	catch (e) {
		//console.log(e)
        res.status(400).send(e)
    }
})

// // GET /tag?limit=20&skip=60
router.get('/blogs/genres/:genre', auth, async (req, res) => {
    try {
		const options = {}
		if(req.query.limit){
			options.limit = parseInt(req.query.limit)
		}
		
		if(req.query.skip){
			options.skip = parseInt(req.query.skip)			
		}
		const genre = req.params.genre;
		
        const blog = await Blog.find({ "genre" : genre }," -content",options)
        res.status(200).send(blog)
    } 
	catch (e) {
		//console.log(e)
        res.status(400).send(e)
    }
})




module.exports = router