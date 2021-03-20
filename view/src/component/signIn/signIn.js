import React from 'react'
import { Form, Button} from "react-bootstrap";
import axios from 'axios';
import {setName,setLastName,setEmail,setPassword} from '../actions/myAction'
import {connect} from 'react-redux'
import './signIn.css'
import { Link, useHistory } from 'react-router-dom'
import fire from '../fire'

function mapStateToProps(state) //appel o store et rend le state de user
{
    return {
        user: state.user //donne moi le obj de redux
    }
}

const mapDispatchToProps =(dispatch)=>({
  setName:(name)=> dispatch(setName(name)),
  setLastName:(lname)=> dispatch(setLastName(lname)),
  setEmail:(email)=> dispatch(setEmail(email)),
  setPassword:(password)=> dispatch(setPassword(password))
})



export default connect (mapStateToProps,mapDispatchToProps)(function SignIn(props) {


  const {user,setName,setLastName,setEmail,setPassword}=props
    const history=useHistory()
    const mySubmit=(e)=>{
    e.preventDefault();
    fire.auth().createUserWithEmailAndPassword(user.email,user.password)
    .then((u)=>{
      console.log('fire signed up')
      axios.post('http://localhost:3000/addUser', {
        name:user.name,
        lastName:user.lastName,
        email:user.email,
        password:user.password
      }).then((response) => {
        console.log(response);
      },(error) => {
        console.log(error);
      })
      history.push("/")
    })
    .catch((err)=>{
      console.log('err fire gign up'+ err)
    })
      
  }

    return (
      <div className="container" id="signInContainer">
      <div className="d-flex justify-content-center h-100">
        <div className="card" id="signIn">
          <div className="card-header">
            <h3>Sign In</h3>
          </div>
          <div className='card-body'>
        <Form onSubmit={mySubmit}>
        <Form.Group controlId="formName">
          <Form.Label>Name </Form.Label>
          <Form.Control type="text" placeholder="Enter your name"  onChange={(e)=>{setName(e.target.value)}} />
        </Form.Group>
      
        <Form.Group controlId="formLastName">
          <Form.Label>LastName</Form.Label>
          <Form.Control type="text" placeholder="Last Name"   onChange={(e)=>{setLastName(e.target.value)}}/>
        </Form.Group>

        <Form.Group controlId="formEmail">
          <Form.Label>Email </Form.Label>
          <Form.Control type="email" placeholder="Mail"   onChange={(e)=>{setEmail(e.target.value)}}/>
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password"  onChange={(e)=>{setPassword(e.target.value)}}/>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={(user.email && user.password && user.name && user.lastName) === ''}>
          Submit
        </Button>
      </Form>
      <div className="d-flex justify-content-center">
      <Link to="/" id="signInLink" >Log In</Link>
        </div>
      </div>
        </div>
      </div>
      </div>
    )

})