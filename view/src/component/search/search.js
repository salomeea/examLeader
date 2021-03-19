import React from 'react'
import './search.css'

export default function Search({input,setInput,editTodo,onFormSubmit})
{

  
  return (
    <form onSubmit={onFormSubmit}>
      <input id='search' type='text' placeholder='enter a todo...' value={input} onChange={(e)=>{setInput(e.target.value)}} />
      <button id='btns' className='button=add' type='submit'>{editTodo?'OK':'Add'}</button>
    </form>
  )

}