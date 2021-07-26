const mongoose = require('mongoose')

// console.log(process.env.MONGODB_URL)


// // Demonstrate the readyState and on event emitters
// console.log(mongoose.connection.readyState); //logs 0
// mongoose.connection.on('connecting', () => { 
//   console.log('connecting')
//   console.log(mongoose.connection.readyState); //logs 2
// });
// mongoose.connection.on('connected', () => {
//   console.log('connected');
//   console.log(mongoose.connection.readyState); //logs 1
// });
// mongoose.connection.on('disconnecting', () => {
//   console.log('disconnecting');
//   console.log(mongoose.connection.readyState); // logs 3
// });
// mongoose.connection.on('disconnected', () => {
//   console.log('disconnected');
//   console.log(mongoose.connection.readyState); //logs 0
// });



mongoose.connect(process.env.MONGODB_URL, {
	useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
})