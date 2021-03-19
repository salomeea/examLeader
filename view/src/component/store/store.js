import {createStore} from 'redux'
import produce from 'immer'

const initialState={

    user:
    {
         name:'',
         lastName:'',
         email:'',
         password: '',
         _id:''
    },
    token:{ id:''}
  
    
}

const reducer =produce ((state,action)=>{
    switch(action.type){
        case 'SET_NAME':
            state.user.name=action.payload
            break
        case 'SET_LAST_NAME':
            state.user.lastName=action.payload
            break
        case 'SET_EMAIL':
            state.user.email=action.payload
            break
        case 'SET_PASSWORD':
            state.user.password=action.payload
            break
        case 'SET_ID':
            state.user._id=action.payload
            break
        case 'SET_TOKEN':
            state.token.id=action.payload
            break
        default: return state


    }
},initialState)

const store=createStore(reducer)
window.store=store
export default store