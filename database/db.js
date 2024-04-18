const mongoose = require('mongoose')

const connectDB = async(url)=>{
    try{

        const connectionResponse = await mongoose.connect(url)
        console.log("db connected")
      }
      catch(err){
        console.log("connection error:",err)
      }
    }
module.exports= connectDB;