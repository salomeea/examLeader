const Task=require('../model/task')
const User=require('../model/user')
const addTask=(req,res)=>{

    const myTask=new Task(req.body)
    myTask.save()
    .then(task=>{
        User.findByIdAndUpdate({_id:task.userId},{$push:{'tasks':task._id}})
        .then(user=>{
            console.log(user)
        })
        .catch(err=>{
            console.log('err in finding and update task in User')
        })
        res.json({task:task})
    })
    .catch(err=>{
        console.log("err adding task",err)
    })


}



const deleteTask= async(req,res)=>{

let b=req.params.title.replace(/_/g,' ')
console.log(b)
try{
    
    const a= await Task.find({'title':{$eq: b}})
    const task= a[0]
    console.log(task)
    await User.findByIdAndUpdate(task.userId,{$pull:{tasks:task._id}}).then(user=>{console.log(user)})
    await Task.findByIdAndDelete(task._id)
    const otherTask=await Task.find()
    res.status(200).json({task:otherTask})
}
catch(err){
    console.log('err in deleting task')
}

}

const getTask= (req,res)=>{
        Task.findById(req.params.id)
        .then(task=>{
            console.log('inTask')
            res.json({task:task})
        })
        .catch(err=>{
            console.log('err geting task',err)
        })

}
const updateTask=(req,res)=>{

    console.log(req.body.title)
    let params = { 
        title: req.body.title,
        completed: req.body.completed
}

    for(let prop in params)  //This will not handle intentionally setting to false, empty string, null, 0, or other falsey values.
    {
         if(!params[prop]) 
         delete params[prop];
    }

    console.log(req.body.hlp)
    Task.findOneAndUpdate({title:req.body.hlp },params)
    .then(task=>{
        console.log(task)
        res.status(200).json({task:task})
    })
    .catch(err=>{
        res.status(400).json(err)
    })

}

const updateCompletedTask=(req,res)=>{

    Task.findOneAndUpdate({title:req.params.title },{completed:req.body.completed})
    .then(task=>{
        console.log(task)
        res.status(200).json({task:task})
    })
    .catch(err=>{
        res.status(400).json(err)
    })

}

module.exports={addTask,deleteTask,updateTask,getTask,updateCompletedTask}
