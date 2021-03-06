require('dotenv').config();
const mongoose=require('mongoose');

mongoose.connect(process.env.MONGO_URI,{
    useNewURLParser:true,
    useUnifiedTopology:true,
});

mongoose.connection
.on('open',()=>console.log('connected to Mongoose'))
.on('close',()=>console.log('Disconnected from Mongoose'))
.on('error',(error)=>console.log(error));

module.exports=mongoose;