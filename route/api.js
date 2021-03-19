const router=require('express').Router()
const user=require('../controller/user')
const task=require('../controller/task')

router.post('/addUser',user.addUser)
router.post('/login',user.login)
router.get('/getAllUser',user.getAllUser)
router.delete('/removeUser/:id',user.removeUser)
router.get('/getAllUserTasks/:id',user.getAllUserTasks)

router.get('/getTask/:id',task.getTask)
router.post('/addTask',task.addTask)
router.get('/deleteTask/:title',task.deleteTask)
router.post('/updateTask',task.updateTask)
router.patch('/updateCompletedTask/:title',task.updateCompletedTask)

module.exports=router