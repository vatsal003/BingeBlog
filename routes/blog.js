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


// // GET /tasks?completed=true
// // GET /tasks?limit=10&skip=20
// // GET /tasks?sortBy=createdAt:desc
// router.get('/tasks', auth, async (req, res) => {
//     const match = {}
//     const sort = {}

//     if (req.query.completed) {
//         match.completed = req.query.completed === 'true'
//     }

//     if (req.query.sortBy) {
//         const parts = req.query.sortBy.split(':')
//         sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
//     }

//     try {
//         await req.user.populate({
//             path: 'tasks',
//             match,
//             options: {
//                 limit: parseInt(req.query.limit),
//                 skip: parseInt(req.query.skip),
//                 sort
//             }
//         }).execPopulate()
//         res.send(req.user.tasks)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.get('/tasks/:id', auth, async (req, res) => {
//     const _id = req.params.id

//     try {
//         const task = await Task.findOne({ _id, owner: req.user._id })

//         if (!task) {
//             return res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

// router.patch('/tasks/:id', auth, async (req, res) => {
//     const updates = Object.keys(req.body)
//     const allowedUpdates = ['description', 'completed']
//     const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

//     if (!isValidOperation) {
//         return res.status(400).send({ error: 'Invalid updates!' })
//     }

//     try {
//         const task = await Task.findOne({ _id: req.params.id, owner: req.user._id})

//         if (!task) {
//             return res.status(404).send()
//         }

//         updates.forEach((update) => task[update] = req.body[update])
//         await task.save()
//         res.send(task)
//     } catch (e) {
//         res.status(400).send(e)
//     }
// })

// router.delete('/tasks/:id', auth, async (req, res) => {
//     try {
//         const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })

//         if (!task) {
//             res.status(404).send()
//         }

//         res.send(task)
//     } catch (e) {
//         res.status(500).send()
//     }
// })

module.exports = router