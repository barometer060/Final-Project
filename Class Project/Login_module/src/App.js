import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import FrontPage from './components/frontPage';
import ForgotPassword from './components/forgotPassword';
import SignUp from './components/signUp'
import './App.css';

class App extends Component {
  
  render() {
    return (
      <div className="App">
        <Router>
       
        <Switch>

<Route exact path='/' component={FrontPage}/>
<Route exact path='/forgot' component={ForgotPassword}/>
<Route exact path='/signUp' component={SignUp}></Route>



        </Switch>
      </Router>
      </div>
    );
  }
}

export default App;
