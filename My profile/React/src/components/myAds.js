import React, { Component } from 'react';
import '../App.css';

class myAds extends Component {
  render() {
    return (
        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
        <div className="row">
            <div className="col-md-6">
                <label>User Id</label>
            </div>
            <div className="col-md-6">
                <p>Kshiti123</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <label>Name</label>
            </div>
            <div className="col-md-6">
                <p>Kshiti Ghelani</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <label>Email</label>
            </div>
            <div className="col-md-6">
                <p>kshitighelani@gmail.com</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <label>Phone</label>
            </div>
            <div className="col-md-6">
                <p>123 456 7890</p>
            </div>
        </div>
        <div className="row">
            <div className="col-md-6">
                <label>Profession</label>
            </div>
            <div className="col-md-6">
                <p>Web Developer and Designer</p>
            </div>
        </div>
</div>
    );
  }
}

export default myAds;
