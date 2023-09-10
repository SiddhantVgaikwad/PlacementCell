const mongoose = require('mongoose');
mongoose.set('strictQuery',true);
const DB = 'mongodb+srv://deadpool:ironman@project.hlhbwnd.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(DB, {
	useNewUrlParser: true,
  	useUnifiedTopology: true,
 	
 }).then(() => {
	console.log('connection successful');
}).catch((err) => console.log('no connection',err));

module.exports = mongoose;