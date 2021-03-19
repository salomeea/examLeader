import React, { useEffect, useState } from "react";
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'
import Search from '../search/search'
import './myTask.css'
import Todo from '../todo/todo'
import { v4 as uuidv4 } from 'uuid'
import { connect } from 'react-redux'
import axios from 'axios';
import { Link } from "react-router-dom";


function mapStateToProps(state) 
{
    return {
        user: state.user ,//donne moi le obj de redux
        token:state.token
    }
}
export default connect(mapStateToProps)( function MyTask(props) {
    const {myList, user,token } = props
    const [myNewList, setMyNewList] = useState([])
    const [input, setInput] = useState('')
    const [todo, setTodo] = useState([])
    const [editTodo, setEditTodo] = useState(null)
  //  const [marr,setArr]=useState([])
  //   const [t,setT]=useState(false)
    
    useEffect(() => {
        if (editTodo) {
            setInput(editTodo.title)
           
        }
        else {
            setInput("")
           
        }
    }, [editTodo, setInput])



const getall=()=>{
    //console.log(token.id)
    //console.log(user._id)
    axios.get(`http://localhost:3000/getAllUserTasks/${user._id}` , {
        headers: {
          'authorization': `${token.id}` 
        }
        })
    .then((response => {
        console.log(response)
       console.log(response.data.user.tasks)
       if(response.data.user.tasks!==[])
       {
           setTodo(response.data.user.tasks)
       }
      

    })
    , (error) => {
        console.log('ya d propblemes',error);
    })
}

useEffect(getall,[user._id,token.id])


    function mySet(e) {
        console.log(e)
        const y = e.target.textContent
        setMyNewList(myNewList.concat([y]))
        setTodo([...todo, { _id: uuidv4(), title: y, completed: false }])

        axios.post('http://localhost:3000/addTask', {
            userId: user._id,
            title: y,
            completed: false
        },{
            headers: {
              'authorization': `${token.id}` 
            }
            }).then((response) => {
            console.log(response)

        }, (error) => {
            console.log(error);
        })

    }


    const handleDelete = (elementDel) => {
        console.log(elementDel)
        setTodo(todo.filter((x) => x._id !== elementDel._id))
        let b = elementDel.title.replaceAll(' ', '_')
        console.log(b)
        axios.get(`http://localhost:3000/deleteTask/${b}`,{
            headers: {
              'authorization': `${token.id}` 
            }
            })
            .then((response) => {
                console.log(response)

            }, (error) => {
                console.log(error);
            })
    }



    const handlerDone = (elementDone) => {
        console.log(elementDone)

        setTodo(todo.map(item => {
            if (item._id === elementDone._id) {

                return { ...item, completed: !item.completed }
            }
            return item
        }))

        axios.patch(`http://localhost:3000/updateCompletedTask/${elementDone.title}`, {
                completed: !(elementDone.completed)
            },{
                headers: {
                  'authorization': `${token.id}` 
                }
                }).then((response) => {
                console.log(response)

            }, (error) => {
                console.log(error);
            })


    }

    const onFormSubmit = (e) => {
        e.preventDefault();
        console.log(e)
        if (!editTodo) // si editTodo =null
        {
            setTodo([...todo, { _id: uuidv4(), title: input, completed: false }])
            setInput('')

            axios.post('http://localhost:3000/addTask', {
                userId: user._id,
                title: input,
                completed: false
            },{
                headers: {
                  'authorization': `${token.id}` 
            }}
            ).then((response) => {
                console.log(response)

            }, (error) => {
                console.log(error);
            })
        }
        else {
            updateTodo(input, editTodo._id, editTodo.completed) 
        }

    }
    

    const updateTodo = (title, _id, completed) => {
        const newTodo = todo.map(item => (item._id === _id) ? { title, _id, completed } : item) //si c egale
        console.log(newTodo)
        setTodo(newTodo)
        setEditTodo("")
        console.log(title,_id,completed)
        const hlp= todo.map(item => (item._id === _id) ?  item.title : '')
        console.log(hlp)
        axios.post('http://localhost:3000/updateTask', {
                title: title,
                completed: false,
                hlp:hlp[0]
            },{
                headers: {
                  'authorization': `${token.id}` 
                }
                }).then((response) => {
                console.log(response)

            }, (error) => {
                console.log(error);
            })


    }

    const handlerEdit = ({ _id }) => { //remplie notre editTodoavc le obyect a editer 
        const findTodo = todo.find(x => x._id === _id)
        console.log(findTodo)
        setEditTodo(findTodo)
    }


    return (
        
      
                   
            <div className="container" id="containermyTask"> 
           
                
                 <h4 id="myh4" >Todo-List: </h4>
                 <DropdownButton id="dropdown-item-button" className="drp" title="List of todo" >
                    {myList.map(lst => {
                        return <Dropdown.Item as="button" key={lst.id} onClick={mySet}>{lst.title} </Dropdown.Item>
                    })}
                </DropdownButton> 
                <div><Search input={input} setInput={setInput} onFormSubmit={onFormSubmit} editTodo={editTodo}/></div>
            
            <div id='taille'>
                
                <Todo todo={todo} handleDelete={handleDelete} handlerDone={handlerDone} handlerEdit={handlerEdit} /></div>
             <Link to='showAll'>see All Tasks</Link>
            
          
         </div>
    );
})