import React, { Component } from "react";
import "../App.css";

class EditDetails extends Component {
  constructor() {
    super();
    this.state = {
      userDetails: {
        address: {}
      }
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    fetch("http://localhost:8000/rest/api/users/edituserdetails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userId: "c86cb7fd-fcc0-4531-8b89-bc39895204e9",
        firstName: this.refs.fname.value,
        lastName: this.refs.lname.value,
        phoneNumber: this.refs.phno.value,
        address: {
          city: this.refs.city.value,
          landmark: this.refs.land.value,
          pincode: this.refs.pin.value
        },
        dateOfBirth: this.refs.dob.value
      })
    }).then(data => {
      this.props.onDataUpdate(0);
    });
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
        data.dateOfBirth = new Date(data.dateOfBirth);
        var newDate = new Date(
          data.dateOfBirth.setTime(data.dateOfBirth.getTime())
        );
        data.dateOfBirth = newDate.toISOString().split("T")[0];
        this.setState({ userDetails: data });

        console.log(this.state.userDetails);
      })
      .catch(err => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="App">
        <form className="form" onSubmit={this.handleSubmit.bind(this)}>
          <table>
            <thead />
            <tbody>
              <tr>
                <td>
                  <label>First Name : </label>
                </td>
                <td>
                  <input
                    type="text"
                    ref="fname"
                    defaultValue={this.state.userDetails.firstName}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>LastName :</label>
                </td>
                <td>
                  <input
                    type="text"
                    ref="lname"
                    defaultValue={this.state.userDetails.lastName}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Phone Number :</label>
                  <br />
                </td>
                <td>
                  <input
                    type="number"
                    ref="phno"
                    defaultValue={this.state.userDetails.phoneNumber}
                    pattern="[2-9]{2}\d{8}"
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Date of Birth :</label>
                </td>
                <td>
                  <input
                    type="date"
                    ref="dob"
                    defaultValue={this.state.userDetails.dateOfBirth}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Landmark :</label>
                </td>
                <td>
                  <input
                    type="text"
                    ref="land"
                    defaultValue={this.state.userDetails.address.landmark}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td>
                  {" "}
                  <label>City :</label>
                </td>
                <td>
                  <input
                    type="text"
                    ref="city"
                    defaultValue={this.state.userDetails.address.city}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <label>Pincode :</label>
                </td>
                <td>
                  <input
                    type="number"
                    ref="pin"
                    defaultValue={this.state.userDetails.address.pincode}
                  />
                </td>
              </tr>

              <tr>
                <td colSpan="2">
                  <input type="submit" />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    );
  }
}

export default EditDetails;
