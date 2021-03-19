const express=require("express")
const app=express()
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const bodyParser = require("body-parser")
const router=require('./route/api')
const cors=require('cors') //avtaha
// mongoose.set('useFindAndModify', false)
const jwt=require('jsonwebtoken')

dotenv.config()

app.use(cors())
app.use(bodyParser.json())




app.use('/',function (req,res,next){

    console.log('middleware for token')
    if (req.path!=='/login' && req.path!=='/addUser')
    {
    //console.log(req.headers['authorization'])

        try{
            jwt.verify(req.headers['authorization'] ,process.env.TOKEN)
            next()
            
        }
        catch(err){
            console.log(err)
            res.send('log in first!')
            
        }
    }
    else{
        next()
    }
    
        
    
})

app.use('/',router)

const connectionParams={
    useNewUrlParser:true,
    useCreateIndex:true,
    useUnifiedTopology:true
}


mongoose.connect(process.env.DB_CONNECT, connectionParams)
.then(()=>{
    console.log('your are connected to the database')
})
.catch((err)=>
{
    console.log(`connection err with DB: ${err}`)

})

app.listen(process.env.PORT,()=>{console.log(`in port ${process.env.PORT}`)})
