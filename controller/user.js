const Task = require('../model/task')
const User=require('../model/user')
const jwt=require('jsonwebtoken')

const addUser=async(req,res)=>{
    const myUser=new User(req.body)
    try{
        
        const user=await myUser.save()
        res.status(200).json({user: user})

    }
    catch(err)
    {
        
        res.status(400).json(err)
    }
}
        
    
const getAllUser= (req,res)=>{
    User.find()
    .then(user=>{
        res.json({user: user})
    }).catch(err=>{
        console.log(err)
    })
}

const login=(req,res)=>{
    const {email,password}=req.body
    User.find({$and:[{'email':{$eq: email} },{'password':{$eq:password}}] })
    .then(user=>{
        console.log(user)
        const token=jwt.sign({password:password},process.env.TOKEN)

        res.json({user:user ,token:token})
    })
    .catch(err=>{
        console.log('you need to login first!')
    })
}



const removeUser= (req,res)=>{
    Task.deleteMany({'userId': req.params.id})
    .then(response=>{
        console.log(response.deletedCount)
    })
    .catch(err=>{
        console.log('err in delete task' )
    })
    User.findByIdAndDelete(req.params.id)
    .then(user=>{
        console.log('delete a user')
        res.status(200).json({user:user })
    })
    .catch(err=>{
        console.log(err)
    })

}


const getAllUserTasks=async (req,res)=>{

    try{

       let a= await User.findById(req.params.id).populate({path:'tasks' , select:'title completed _id'})
       res.json({user:a})
    }
    catch(err)
    {
        console.log(err)
    }
  
}
module.exports={addUser,getAllUser,removeUser,login,getAllUserTasks}