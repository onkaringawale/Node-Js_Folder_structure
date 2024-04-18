
const { response } = require('express')
const userSchema = require('../model/userModel')
const userModel = require('../model/userModel')
const userRegModel = require('../model/regModal')

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')

const getMethod = async(req,res)=>{
    try {
        const allData = await userSchema.find()
        res.status(200).json(allData)
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}

const postMethod= async (req,res)=>{
   const {name,email} = req.body
   try{
       const createUser = await userSchema.create({
        name:name,
        email:email
       })
       res.status(200).json(createUser)
       
    }
    catch(err){
       res.status(400).json({error:err.message})
   
   }
}

const updateRecord= async (req,res)=>{
   const {id ,name,email} = req.body
   try{
       const updateUser = await userModel.findByIdAndUpdate({_id:id},{
        name:name,
        email:email
       })
       res.status(200).json(updateUser)
       
    }
    catch(err){
       res.status(400).json({error:err.message})
   
   }
}

const deleteData = async(req,res)=>{
    const id = req.params.id
    try {
        const deleteId = await userSchema.findByIdAndDelete(id)
        
        res.status(200).json("Record deleted successfully")
    } catch (error) {
        res.status(400).json({error:error.message})
        
    }
}

const register = async(req,res)=>{
  try {
    const { username , password } = req.body
    const hashedPass = await  bcrypt.hash(password,10);
    const user = await userRegModel.create({
        username:username,
        password:hashedPass

    })
    res.status(200).json(user)
  } catch (error) {
    res.status(400).json({error:error.message})
  }
}

const login = async(req,res)=>{
    try {
        const { username,password} = req.body
        const user = await userRegModel.findOne({username})
        if(!user){
           return res.status(400).json({error:"Authontication Failed"})
           
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).json({error:"Authontication Failed"})

        }
        const accessToken =  jwt.sign({userId:user._id},'auth-secret',{expiresIn: '1h'})
        res.status(200).json({
            status: 'success',
            message: 'User Logged In!',
            data: {
              accessToken,
            },
          });
    } catch (error) {
        res.status(400).json({error:error.message})
    }
}
module.exports = {getMethod,postMethod,updateRecord,deleteData,register,login}