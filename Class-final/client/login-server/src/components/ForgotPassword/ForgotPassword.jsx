import React, { Component } from "react";
import InputItem from "../InputItem/InputItem";

class ForgotPassword extends Component {
  state = {
    email: "",
    securityQues: "",
    submittedAns: ""
  };

  componentWillMount() {}

  handleInputChange = () => {};

  render() {
    const options = this.state.questions.map(ques => {
      return (
        <option value={ques.quesId} key={ques.quesId}>
          {ques.question}
        </option>
      );
    });
    return (
      <div className="container">
        <div className="card mx-auto">
          <div className="card-body">
            <h3 className="card-title text-center">Forgot Password</h3>
            <form className="form">
              <InputItem
                label="Email"
                type="email"
                id="email"
                onInputChange={this.handleInputChange}
              />
              <select
                name="question"
                id=""
                className="custom-select"
                style={{ borderRadius: "2em" }}
              >
                {options}
              </select>
              <InputItem label="Your Answer" type="text" id="answer" />
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default ForgotPassword;
