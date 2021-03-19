const mongoose=require('mongoose')

const taskSchema=mongoose.Schema({

    userId:{
        type: mongoose.Types.ObjectId,ref:'User'
    },
    
    title:{
        type:String,
        require:true
    },
    completed:{
        type:Boolean,
        default:false
    }

})

module.exports=mongoose.model('Task',taskSchema)