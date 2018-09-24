import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './signUp.css';

class SignUp extends Component {

  constructor(props) {
    super(props);
    this.state = {
      
      checkEmailID:  false,
      checkPhoneNumber:  false,
      passChecked: false,
      passConfirm : true,
      isFresh : true,
      checkSecQ : true,
      isSuccess : false
    }
    this.noteFirstName = this.noteFirstName.bind(this)
    this.noteLastName = this.noteLastName.bind(this)
    this.noteDOB = this.noteDOB.bind(this)
    this.noteCity = this.noteCity.bind(this)
    
    this.notePassword = this.notePassword.bind(this)
    this.noteEmail = this.noteEmail.bind(this)
    this.noteLandmark = this.noteLandmark.bind(this)
    this.notePincode = this.notePincode.bind(this)
    this.notePhoneNumber = this.notePhoneNumber.bind(this)
    this.noteSecQ = this.noteSecQ.bind(this)
    this.validateEmail = this.validateEmail.bind(this)
    this.validatePhone = this.validatePhone.bind(this)
    this.handleOnSubmit = this.handleOnSubmit.bind(this)
    this.handlePasswordCheck= this.handlePasswordCheck.bind(this)
    this.handlePasswordConfirm = this.handlePasswordConfirm.bind(this)
    this.handleCancel1 = this.handleCancel1.bind(this)
  }

  componentWillMount() {
    fetch("http://localhost:6324/rest/api/signUp/securityQ")
      .then((ques) => {
        return ques.json()
        
      }).then(data => {
        var options = data.map(item => { return <option key={item.quesId} value={item.quesId} >{item.question}</option> })
       
        this.setState({ optionsKey: options });
      })
  }

   handlePasswordCheck() {
    let re = /(?=^.{8,}$)((?=.*\d)(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/;
    let isPassValid = re.test(String(this.state.password1));
    //console.log(!isPassValid)
    this.setState({
      passChecked: !isPassValid
    })
  }

  handlePasswordConfirm(){
    //console.log(this.state.password1);
    //console.log(this.state.password2)
    if(this.state.password1 == this.state.password2){
      //console.log("passwords are same")
      this.setState({passConfirm : true})
    }
    else{
      this.setState({passConfirm : false})
    }
  }


  handleCancel(){
    this.setState({
      firstName : "",
      lastName : "",
      dateOfBirth : "",
      emailId : "",
      phoneNumber : "",
      password : "",
      address : {
        city: "",              
        landmark: "",
        pincode: ""
      },
      answer : "",
      checkEmailID : false,
      checkPhoneNumber : false,
      passChecked: false,
      passConfirm : true,
      isFresh : true,
      checkSecQ : true,
      isSuccess : false
      
      

    });


  }



  handleCancel1(){
    this.setState({
      firstName : "",
      lastName : "",
      dateOfBirth : "",
      emailId : "",
      phoneNumber : "",
      password : "",
      address : {
        city: "",              
        landmark: "",
        pincode: ""
      },
      answer : "",
      checkEmailID : false,
      checkPhoneNumber : false,
      passChecked: false,
      passConfirm : true,
      isFresh : true,
      checkSecQ : true
      
      
      

    });
    


  }


  validateEmail() {
    console.log(this.state.emailId)
    if(this.state.emailId && this.state.emailId!=""){
     fetch('http://localhost:6324/rest/api/signUp/emailId', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
          
          "emailId":this.state.emailId,
         
        })
      }).then(function(response) {
      return response.json();
    }).then((ans)=>{
             console.log(ans.email)
            if(ans.email == 0 ){
              this.setState({checkEmailID:false})
              this.setState({isFresh : false})
            }
            else{
              this.setState({isFresh : false})
              this.setState({checkEmailID:true})
            }
      });
  }}

  validatePhone() {
    if(this.state.phoneNumber && this.state.phoneNumber!= ""){
    fetch('http://localhost:6324/rest/api/signUp/phoneNumber', {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
          
           "phoneNumber":this.state.phoneNumber,
          
        })
      }).then(function(response) {
      return response.json();
    }).then((ans)=>{
      console.log(ans)
            if(ans.phone == 0 ){
              this.setState({checkPhoneNumber:false})
            }
            else{
              console.log("phone becoming true")
              this.setState({checkPhoneNumber:true})
            }
      });

  }}

  noteFirstName(event) {
    this.setState({ firstName: event.target.value })
  }

  noteLastName(event) {
    
    this.setState({ lastName: event.target.value })
  }

  noteEmail(event) {
    this.setState({ emailId: event.target.value })
  }

  notePassword(event) {
    this.setState({ password1: event.target.value })
  }

  noteConfirmPassword(event) {
    this.setState({ password2: event.target.value })
  }

  notePhoneNumber(event) {
    this.setState({ phoneNumber: event.target.value })
  }

  noteDOB(event) {
    var s = new Date(event.target.value)
    this.setState({ dateOfBirth: s })
  }

  noteLandmark(event) {
    this.setState({ landmark: event.target.value })
  }

  noteCity(event) {
    console.log("note city "+event.target.value)
    this.setState({ city: event.target.value })
  }

  notePincode(event) {
    //console.log("sujan")
    this.setState({ pincode: event.target.value })
  }

  noteSecQ(event) {
    if(event.target.value === "select"){
      //please select security question
      this.setState({checkSecQ : true})
    }
    else{
      this.setState({securityQ:parseInt(event.target.value)})
      this.setState({checkSecQ : false})
    }
    //console.log(event.target.value);
  }

  noteAnswer(event) {
    this.setState({ answer: event.target.value });
  }

  handleOnSubmit(event) {
    event.preventDefault();
    fetch('http://localhost:6324/rest/api/signUp/insertUserDetails', {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body:JSON.stringify({
          
            firstName : this.state.firstName,
            lastName : this.state.lastName,
            dateOfBirth : this.state.dateOfBirth,
            emailId : this.state.emailId,
            phoneNumber : this.state.phoneNumber,
            password : this.state.password1,
            
              city: this.state.city,              
              landmark: this.state.landmark,
              pincode: this.state.pincode,
            
            answer : this.state.answer,
            securityQ : this.state.securityQ
          
        })
      }).then((res)=>{return res.json()}).then((data)=>{
        if(data.ok==1){
          this.setState({message:"Successfully created new account",
                         isSuccess : true
                        }
          )
          document.getElementById("myForm").reset();
          this.handleCancel1();
        }
        else{
          console.log(data)
        }
      })

  }

  displayValues(){
    console.log("check email " +this.state.checkEmailID)
    console.log("check phone " +this.state.checkPhoneNumber)
    
    console.log("check secq " +this.state.checkSecQ)
    console.log("pass check "+this.state.passChecked)
    console.log("is fresh " +this.state.isFresh)
    console.log("pass confirm" + this.state.passConfirm)
  }

  render() {
    var submitButton;
    if(!this.state.isFresh && !this.state.checkSecQ && !this.state.checkEmailID && !this.state.checkPhoneNumber && !this.state.passChecked && this.state.passConfirm ){
      
      submitButton = <button  type="submit">Submit</button>
    }
    else{
      //console.log('not disabled')
      submitButton = <button  type="submit" className='abc' disabled >Submit</button>
    }
    return (
      <div className="App">
        <h1>Sign Up for classifieds</h1>
        <form className="form" id="myForm" onSubmit={this.handleOnSubmit} >
          <table >
            <thead></thead>
            <tbody>
              <tr>
                <td><label>First Name<span className="requiredField">*</span> </label></td>
                <td><input type="text"  required onChange={this.noteFirstName} /></td>
                <td></td>
              </tr>
              <tr>
                <td><label >LastName </label></td>
                <td><input type="text" onChange={this.noteLastName} /></td>
                <td></td>
              </tr>
              <tr>
                <td><label >Email<span className="requiredField">*</span> </label></td>
                <td><input type="email" required onChange={this.noteEmail} onBlur={this.validateEmail} /></td>
                <td>{this.state.checkEmailID && <span className="warning">Email is already registered</span>}</td>
              </tr>
              <tr>
                <td><label >Password<span className="requiredField">*</span> </label></td>
                <td><input type="password" required onChange={this.notePassword} onBlur= {this.handlePasswordCheck} /><br/>
                </td>
                <td>{this.state.passChecked && <span className="warning">Password should contain one captial letter, one number and a special character </span>}
                {!this.state.passChecked && <span >Password should contain one captial letter, one number and a special character </span>}</td>
              </tr>
              <tr>
                <td><label >Confirm Password<span className="requiredField">*</span> </label></td>
                <td><input type="password" required onChange={this.noteConfirmPassword.bind(this)} onBlur={this.handlePasswordConfirm} /><br/> </td>
                <td>{ !this.state.passConfirm && <span className= "warning">Passwords dont match</span>}</td>
              </tr>
              <tr>
                <td><label >Phone Number<span className="requiredField">*</span> </label>{this.state.checkPhoneNumber && <span className="warning" >Phone Number is already registered</span>}<br /></td>
                <td><input type="number" pattern="[2-9]{2}\d{8}" required onChange={this.notePhoneNumber} onBlur= {this.validatePhone} /></td>
                <td></td>
              </tr>
              <tr>
                <td><label >Date of Birth<span className="requiredField">*</span> </label></td>
               
                <td><input type="date" required onChange={this.noteDOB} /></td>
                 <td></td> 
              </tr>
              <tr>
                <td><label >Landmark </label></td>
                <td><input type="text" onChange={this.noteLandmark} /></td>
                <td></td>
              </tr>
              <tr>
                <td> <label >City<span className="requiredField">*</span> </label></td>
                <td><input type="text" required onChange={this.noteCity} /></td>
                <td></td>
              </tr>
              <tr>
                <td><label >Pincode </label></td>
                <td><input type="number" onChange={this.notePincode} /></td>
                <td></td>
              </tr>
              <tr>
                <td><label >Security Question<span className="requiredField">*</span> </label></td>
                <td><select name="carlist" defaultValue= "select" onChange={this.noteSecQ}>
              <option value="select" required>Select</option>
              {this.state.optionsKey}
            </select>
                </td>
                <td>
                </td>
              </tr>
              <tr>
                <td><label >Answer<span className="requiredField">*</span> </label><br /></td>
                <td><input type="text" required onChange={this.noteAnswer.bind(this)} /></td>
              </tr>
              <tr>
                <td>{submitButton} </td>
                <td><Link to={'/'}>    <button type="button" value="Cancel"  >Cancel</button></Link></td>
              </tr>
            </tbody>
          </table>
          
          
         {/*onClick={this.handleCancel.bind(this)} */}

        </form>
       {this.state.isSuccess && <p>{this.state.message} &nbsp; &nbsp;<Link to={'/'}> Login  </Link> </p>}
      </div>
    );
  }
}

export default SignUp;

