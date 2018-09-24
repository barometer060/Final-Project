import React, { Component } from "react";
import "../App.css";

class About extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: { address: {} }
    };
  }

  componentWillMount() {
    fetch("http://localhost:8000/rest/api/users/userdetails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: "c86cb7fd-fcc0-4531-8b89-bc39895204e9"
      })
    })
      .then(result => {
        return result.json();
      })
      .then(data => {
        this.setState({ userDetails: data });

        console.log(this.state.userDetails);
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div
        className="tab-pane fade show active"
        id="home"
        role="tabpanel"
        aria-labelledby="home-tab"
      >
        <div className="row">
          <div className="col-md-6">
            <label>Name</label>
          </div>
          <div className="col-md-6">
            <p>
              {this.state.userDetails.firstName}{" "}
              {this.state.userDetails.lastName}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Email</label>
          </div>
          <div className="col-md-6">
            <p>{this.state.userDetails.emailId}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Phone</label>
          </div>
          <div className="col-md-6">
            <p>{this.state.userDetails.phoneNumber}</p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Address</label>
          </div>
          <div className="col-md-6">
            <p>
              {this.state.userDetails.address.landmark},
              {this.state.userDetails.address.city}-
              {this.state.userDetails.address.pincode}
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <label>Date of Birth</label>
          </div>
          <div className="col-md-6">
            <p>{this.state.userDetails.dateOfBirth}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default About;
