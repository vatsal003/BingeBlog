const express = require('express')
const cors = require('cors')
//const bodyParser = require('body-parser');
// require('./db/mongoose')
// const userRouter = require('./routers/user')
// const taskRouter = require('./routers/task')

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}));

app.use(cors())
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
