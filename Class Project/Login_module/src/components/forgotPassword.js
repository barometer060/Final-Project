import React, { Component } from 'react';
import './forgotPassword.css';
import { Link } from 'react-router-dom';

class ForgotPassword extends Component {

    constructor() {
        super();
        this.state = {
            questions: [],
            verifyField: false,
            securityAlert: false,
            passwordMatch: false,
            passwordNotMatch: false,
            pwdUpdate:false
        }
    }

    componentWillMount() {
        fetch('http://localhost:6324/rest/api/forgot/questions').
            then(allow => {
                return allow.json();
            }).then(data => this.setState({ questions: data.myObj }
            ));
    }

    handleChange = (e) => {
        console.log(e.target.value);
        this.setState({
            quesId: e.target.value
        })
    }

    onSubmitSecurity() {
        if (this.refs.email.value === '' || this.refs.answer.value === '') {
            alert("Please provide all the details")
        }
        else {

            fetch('http://localhost:6324/rest/api/forgot/questionsVerify', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailId: this.refs.email.value,
                    quesId: this.state.quesId,
                    answer: this.refs.answer.value
                })
            }).then(function (response) {
                return response.json();

            }).then(verify => {
                if (verify.verifyData) {
                    this.setState({ emailId: this.refs.email.value }, () => { console.log("Data here") })
                };
                this.setState({ verifyField: verify.verifyData, securityAlert: !verify.verifyData }
                )
            })
        }
    }

    handleCheck() {
        let re = /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
        let isPassValid = re.test(String(this.refs.newPass.value));
        this.setState({
            passChecked: isPassValid
        })
    }

    handleInput() {

        if (this.refs.confirmPass.value == this.refs.newPass.value) {
            this.setState({
                passwordMatch: true,
                passwordNotMatch: false
            })
        }
        else {
            this.setState({
                passwordNotMatch: true,
                passwordMatch: false
            })
        }

    }

    handlePassword(e) {
        e.preventDefault();
        if (this.state.passwordMatch) {
            fetch('http://localhost:6324/rest/api/forgot/changePassword', {
                method: 'post',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    emailId: this.state.emailId,
                    newPassword: this.refs.newPass.value
                })
            }).then(function (response) {
                return response.json();

            }).then(confirm => {
                console.log(confirm.confirmUpdate);
                this.setState({ pwdUpdate: confirm.confirmUpdate })
            })
        }


    }




    render() {
        let questionMenu = this.state.questions.map((ques) => {
            return <option value={ques.quesId} key={ques.quesId} >{ques.question}</option>
        }

        )

        let showHide = '';
        if (this.state.verifyField == false) {
            showHide =
                <div className="head">
                    <h2 id="verify"> Verify Details </h2>
                    <div className="email">
                        <input className="first" type="email" placeholder="Your email" ref="email" required /><br />
                    </div>
                    <div className="dropdown">

                        <select id="mylist" className="form-control" name="questions" onChange={this.handleChange}>
                            <option>Select Security Question</option>
                            {questionMenu}
                        </select>
                    </div>
                    <div className="ans">
                        <input className="second" type="text" placeholder="Your Answer" ref="answer" required />
                    </div>

                    <div className="btn">
                        <button className="login" onClick={this.onSubmitSecurity.bind(this)}>Submit</button>
                    </div>
                </div>

        }

        else {
           if(this.state.pwdUpdate==false){
            showHide = 
                <div className="form">
    
                    <form onSubmit={this.handlePassword.bind(this)}>
                      
                        <div className="back"> <span><i className="fa fa-arrow-circle-left" aria-hidden="true"></i></span></div>
                        <h3 id="verify">Enter New Password</h3>

                        <div className="inputs">
                            <div className="email1">
                                <input className="first1" type="password" placeholder="Enter New Password" ref="newPass" pattern='(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$'
                                    placeholder="Enter New password" onInput={this.handleCheck.bind(this)} />
                                {this.state.passChecked && <span id="okspan" className="glyphicon glyphicon-ok "></span>}
                                {!this.state.passChecked && <span id="notokspan" className="glyphicon glyphicon-remove"></span>}
                                <div>

                                </div>
                                <input className="second1" type="password" placeholder="Confirm Password" ref="confirmPass" onInput={this.handleInput.bind(this)} />
                                {this.state.passwordMatch && <span id="okspan" className="glyphicon glyphicon-ok"></span>}
                                {this.state.passwordNotMatch && <span id="notokspan" className="glyphicon glyphicon-remove"></span>} <br />
                                <input type="submit" className="update" value="Update Password" />
                                
                            </div>

                        </div>
                    </form>

                </div>
            }


        }

        return (
            <div className="fpage">
                {showHide}
                {this.state.securityAlert &&
                    <span>Security response incorrect.</span>}
                    
               {this.state.pwdUpdate && <span><h2 id="updatedPass">Password Updated</h2><Link id="link" to={'/'}>Click here to login</Link></span>}


            </div>
        );
    }
}

export default ForgotPassword;
