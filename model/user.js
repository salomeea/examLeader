const mongoose=require('mongoose')

const userSchema=mongoose.Schema({
    name:{
            type:String,
        },
    lastName:{
            type:String
        },
    email:{
        type:String,
        require:true

    },
    password:{
        type:String,
        
    },
    tasks:[{
        type:mongoose.Types.ObjectId,ref:'Task'
    }]
})

module.exports= mongoose.model('User',userSchema)