const mongoose = require('mongoose')

mongoose.connect('mongodb://172.21.2.236:27017/190110910405')
    .then(()=>{
   	 		console.log("mongodb connet"); 
		})
	.catch(err=>console.log(err))

module.exports  = mongoose;