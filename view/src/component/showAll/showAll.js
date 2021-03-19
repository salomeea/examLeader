import axios from 'axios'
import { connect } from 'react-redux'
import React, { Component } from "react";
import './showAll.css'
import { Link } from 'react-router-dom';
function mapStateToProps(state) {
    return {
        user: state.user,
        token:state.token
    }
}
export default connect(mapStateToProps)(class ShowAll extends Component {
    constructor(props) {
        super(props)

        this.state = {
            list:[]
        }
    }
  
    componentDidMount(){
        axios.get(`http://localhost:3000/getAllUserTasks/${this.props.user._id}`,{
            headers: {
              'authorization': `${this.props.token.id}` 
            }
            })
             .then(response => {
                console.log(response.data.user.tasks)
              this.setState( {list:response.data.user.tasks} )
              console.log(this.state.list)
             }
    )}
    render() {
        return (


            <div className="container" id="showAll">
                <div className="d-flex justify-content-center h-100">
                    <div className="card" id="showAllCard"  >
                        <div className="card-header">
                            <h3>All My Tasks</h3>
                        </div>
                        <div className='card-body' id='shall'>
                           
                            {this.state.list.map(element =>(
                            <li className='list-item' key={element._id}>
                    <input type='text' value={element.title} className='list' onChange={(e)=>e.preventDefault()} />
                     
                           
                </li>
                
            ))} <Link to='/myList'>go back</Link>

                        </div>
                    </div>
                </div>
            </div>
        )
    }

})