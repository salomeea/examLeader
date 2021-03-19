import React, { useState, useEffect } from 'react'
import Spinner from 'react-bootstrap/Spinner'

import './Tasks.css'
import { connect } from 'react-redux'
import MyTasks from '../myTask/myTask'


function mapStateToProps(state) {
    return {
        user: state.user
    }
}
const url = 'https://jsonplaceholder.typicode.com/todos'

export default connect(mapStateToProps)(function MyList(props) {
    const { user } = props
    const [loading, setLoading] = useState(true)
    const [myList, setMyList] = useState([])

    const getUrl = async () => {
        try {
            const res = await fetch(url)
            const myList = await res.json()
            setLoading(false)
            setMyList(myList)

        }
        catch (error) {
            setLoading(false)
            console.log(error)
        }

    }

    useEffect(() => {
        getUrl()
    }, [])


    return (

        <div className="container" id="taskContainer">
            <div className="d-flex justify-content-center h-100">
                <div className="card" id="myListTask">
                    <div className="card-header">
                    <h3 id='monh3' >Welcome </h3>
                    <h3 id='monh3'>{user.name + ' ' + user.lastName}</h3>
                    </div>
                    <div className='card-body' id="bodyTask">
                          {loading? <Spinner animation="border" /> :
                          
                          <div>
                          <MyTasks myList={myList} />   
                        </div>}
                    </div>
                </div>
            </div>
</div>


    )
})