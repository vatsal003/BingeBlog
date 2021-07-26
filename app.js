const express = require('express')
require('dotenv').config();
const cors = require('cors')
//const bodyParser = require('body-parser');
require('./db/db')
// const userRouter = require('./routers/user')
const blogRouter = require('./routes/blog')
const Blog = require('./models/blog')

const app = express()
var multer = require('multer');
var upload = multer();

//limit size
app.use(express.json())
app.use(express.urlencoded({extended:false}));


// // for parsing multipart/form-data
// app.use(upload.array()); 
// app.use(express.static('public'));


app.use(cors())
app.options('*', cors());

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(blogRouter)
//app.use(express.static(path.join(__dirname, 'public')));
//app.use(session({ secret: 'SimpleBlog', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

// app.use(userRouter)
// app.use(taskRouter)

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


app.get('/', (req, res) => {
  res.send('Hello World!')
})











// const cloudinary = require('cloudinary');




// cloudinary.config({ 
//   cloud_name: 'dfqdo2aaz', 
//   api_key: '535848142559685', 
//   api_secret: 'JNTK18N39FdNA-VvVJ1pCWGjomo' 
// });



// cloudinary.v2.uploader.upload("./jenkins.png", {folder:"blog_title"},	
//     function(error, result) {console.log(result, error)});






// try {
// 	// console.log('dsdafadf',req.body)
//     var blog = new Blog({
// 		title:"Blog1",
// 		thumbnail: "image1",
// 		meta: "meta1",
// 		time_to_read: 12,
// 		tags: "horror",
// 		genre: "action",
// 		likes: 12,
// 		rating: 12,
// 		comment_count: 12,
// 		clicks: 20,
// 		content: "vinit"
// 	});
//         blog.save().then(function(err,response){
// 			console.log("done");
// 		});
//         // res.status(201).send(blog)
//     } catch (e) {
// 		console.log(e)
//         // res.status(400).send(e)
//     }
