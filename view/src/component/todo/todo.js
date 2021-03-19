
import './todo.css'
import { FaEdit ,FaWindowClose ,FaCheck} from 'react-icons/fa';
export default function Todo({todo,handleDelete,handlerDone,handlerEdit}) 


{

    
  
    return(
        <div>
            
            {todo.map(element =>(
                <li className='list-item' key={element._id}>
                    <input type='text' value={element.title} className={`list ${element.completed? 'complete': ""}`} onChange={(e)=>e.preventDefault()} />
             {/* <div>    */}
                <button id='btnDone' onClick={()=>handlerDone(element)}>
                <FaCheck className='myfa'/>  
                </button>
                <button id='btnEdit' onClick={()=>handlerEdit(element)}>
                <FaEdit/>  
                </button>
                <button id='btnDel' onClick={()=> handleDelete(element)}>
                <FaWindowClose/>  
                </button>
            {/* </div> */}
                
                </li>
            ))}

            
 
        </div>
    )
    
}