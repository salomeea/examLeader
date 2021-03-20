import React from 'react'
import { Form, Button } from "react-bootstrap";
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios';
import { connect } from 'react-redux'
import { setName, setLastName, setEmail, setPassword, setId,setToken } from '../actions/myAction'
import './login.css'
import fire from '../fire'
function mapStateToProps(state) //appel o store et rend le state de user
{
  return {
    user: state.user, //donne moi le obj de redux
  }
}

const mapDispatchToProps = (dispatch) => ({
  setEmail: (email) => dispatch(setEmail(email)),
  setPassword: (password) => dispatch(setPassword(password)),
  setName: (name) => dispatch(setName(name)),
  setLastName: (lname) => dispatch(setLastName(lname)),
  setId: (id) => dispatch(setId(id)),
  setToken:(token)=>dispatch(setToken(token))
})


export default connect(mapStateToProps, mapDispatchToProps)(function Login(props) {
  const { user, setEmail, setPassword, setName, setLastName, setId,setToken } = props
  const history = useHistory()

  const mySubmit = (e) => {
    e.preventDefault();

fire.auth().signInWithEmailAndPassword(user.email,user.password)
.then((u)=>{
  console.log('logged in')
  axios.post('http://localhost:3000/login', {
    email: user.email,
    password: user.password
  }).then((response) => {
    console.log(response)
   // console.log(response.data.token)
   setToken(response.data.token)

    setName(response.data.user[0].name)
    setLastName(response.data.user[0].lastName);
     console.log(response.data.user[0]._id)
    setId(response.data.user[0]._id)


    history.push("/myList");


  }, (error) => {
    console.log(error);
  })
})
.catch((err)=>{
  console.log('err fire'+ err)
})

   
  }

 

  return (
    <div className="container" id="login">
      <div className="d-flex justify-content-center h-100">
        <div className="card" id="loginCard">
          <div className="card-header">
            <h3>Log In</h3>
          </div>
          <div className='card-body'>
            <Form onSubmit={mySubmit}>
              <Form.Group controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"  onChange={(e) => { setEmail(e.target.value) }} />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"  onChange={(e) => { setPassword(e.target.value) }} />
              </Form.Group>

              <Button variant="primary" type="submit" disabled={(user.email && user.password) === ''}>
                Log-In
        </Button>

            </Form>
            <div className="card-footer">
              <div className="d-flex justify-content-center links">
                <p className='monP'>Don't have an account?</p>
               <Link to="/signIn" >Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    )

    }

)