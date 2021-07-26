const express = require('express')
const Blog = require('../models/blog')
const auth = require('../middleware/auth')
const {algo}= require('./algo')


// const blog = Blog.findOne({  }).then((err,res)=>{
// console.log(res)	
// })
// console.log(blog)

const router = new express.Router()



const cloudinary = require('cloudinary');

cloudinary.config({ 
  cloud_name: 'dfqdo2aaz', 
  api_key: '535848142559685', 
  api_secret: 'JNTK18N39FdNA-VvVJ1pCWGjomo' 
});




const multer = require("multer");


const storage = multer.diskStorage({
	limits: {
        fileSize: 10000000
	},
	filename: function(req, file, callback) {
		callback(null, Date.now() + file.originalname); 
	}
});

const imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/i)) {
        return cb(new Error('This file type is not allowed!'), false);
    }
    cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: imageFilter});










router.post('/blog', auth, upload.single('thumbnail'), async (req, res) => {
    try {
		let thumbnail,thumbnail_id
		if(req.file.qualif){
				const result = await cloudinary.v2.uploader.upload(req.file.thumbnail.path, {folder:"blog_title"});
				   thumbnail = result.secure_ul
				   thumbnail_id = result.public_id

		}
		console.log(req.body)
		const title=req.body.title;
		const meta = req.body.meta;
		const time_to_read=req.body.time_to_read;
		const tags=req.body.tags;
		const genre=req.body.genre;
		let rating
		if(req.body.rating){
			rating=req.body.rating
			
		}
		const content = req.body.content
		
		const blog = new Blog({
			title,
			thumbnail,
			thumbnail_id,
			meta,
			time_to_read,
			tags,
			genre,
			rating,
			content,
			author:req.user._id
		});
        await blog.save()
        res.status(201).send(blog)
    } catch (e) {
		console.log(e)
        res.status(400).send(e)
    }
})



router.get('/blogs/:id', async (req, res) => {
    try {
		const _id = req.params.id;
        //const blog = await Blog.findOne({ _id })
		const blog = await Blog.findOneAndUpdate( {_id}, {$inc : {'clicks' : 1}}, {new: true}, {projection:"-clicks"} )
        res.status(200).send(blog)
    } 
	catch (e) {
		//console.log(e)
        res.status(400).send(e)
    }
})


//dp
// // GET /tag?limit=20&skip=60
// // GET /tag?sortBy=createdAt:desc
router.get('/blogs/tags/:tag/:time', async (req, res) => {
    try {
		console.log(req.params.time)
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
		
        const blog = await Blog.find({ "tags" : tag }," -content -clicks",options).populate('author','name')
		//const blog = await Blog.find({ "tags" : tag }," -clicks",options).populate('author','name')
		// console.log(blog)
		var x;
		if(req.params.time != 'AllBlogs'){
			console.log(blog.length)
			const timerBlog = algo(blog.length,[6,10,1,2,10,6],parseInt(req.params.time))
			console.log('dsgaadfugiuafdgafodayhyoi',timerBlog)
			x = timerBlog.filter(function(e){return e});
			console.log(x)
		}
        res.status(200).send(blog)
    } 
	catch (e) {
		//console.log(e)
        res.status(400).send(e)
    }
})





// // GET /tag?limit=20&skip=60
// // GET /tag?sortBy=createdAt:desc
router.get('/blogs/tags/:tag', async (req, res) => {
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
		
        const blog = await Blog.find({ "tags" : tag }," -content -clicks",options).populate('author','name')

        res.status(200).send(blog)
    } 
	catch (e) {
		//console.log(e)
        res.status(400).send(e)
    }
})



// // GET /tag?limit=20&skip=60
router.get('/blogs/genres/:genre', async (req, res) => {
    try {
		const options = {}
		if(req.query.limit){
			options.limit = parseInt(req.query.limit)
		}
		
		if(req.query.skip){
			options.skip = parseInt(req.query.skip)			
		}
		const genre = req.params.genre;
		
        const blog = await Blog.find({ "genre" : genre }," -content -clicks",options).populate('author','name')
        res.status(200).send(blog)
    } 
	catch (e) {
		//console.log(e)
        res.status(400).send(e)
    }
})


router.delete('/blogs/:id',auth,async (req,res) => {
	try {
        const blog = await Blog.findOneAndDelete({ _id: req.params.id, author: req.user._id })

        if (!blog) {
            res.status(404).send()
        }

        res.send(blog)
    } catch (e) {
        res.status(500).send(e)
    }
	
	
})



module.exports = router






