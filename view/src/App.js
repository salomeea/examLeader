
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './component/login/login';
import {BrowserRouter as Router,Switch,Route,Redirect } from 'react-router-dom'
import SignIn from './component/signIn/signIn';
import MyList from './component/mylist/Tsaks';
import {Provider} from 'react-redux'
import store from './component/store/store'
import ShowAll from './component/showAll/showAll'


function App() {



  return (
   
     <Provider store={store}>
    <Router>
      <Switch>
      <Route exact path="/"  >
       <Redirect to="/login"/>
      </Route>
      <Route path="/login" component={Login} />
      <Route path="/signIn" component={SignIn} />
      <Route path="/myList" component={MyList} />
      <Route path="/showAll" component={ShowAll} />
    </Switch>
    </Router>
   

     </Provider>

  );
}

export default App;
