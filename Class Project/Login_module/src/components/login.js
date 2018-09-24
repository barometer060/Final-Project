import React, { Component } from 'react';
import './login.css'

class Login extends Component {

  constructor() {
    super();
    this.state = {
        errorMessage:false
    }
  }


  handleLogin(e) {
    e.preventDefault();
    fetch('http://localhost:6324/rest/api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        emailId: this.refs.id.value,
        password: this.refs.pwd.value
      })
    })
      .then(allow => {
        //console.log(allow.text());
        return allow.json();
      }).then(data =>{console.log(data.loginPerm);
        this.setState({errorMessage:true});
    
      } )
    //['allowLogin']
  }


  render() {
    let err;
    if(this.state.errorMessage)
    err=<span>Incorrect Username or  Password</span>
    else
    err=""
    //{err}
    return (
      <div className="login">
        <form onSubmit={this.handleLogin.bind(this)}>
        
        {(this.state.errorMessage) && (<span>Incorrect Username or  Password</span>)}<br/>
          <input type='email' ref='id' placeholder='Enter emailid' required/>
          <input type='password' ref='pwd'
           placeholder='Enter password' required/>
          <input type='submit' value='Login' />
        </form>
      </div>
    );
  }
}

export default Login;
