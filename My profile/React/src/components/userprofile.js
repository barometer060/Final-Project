import React, { Component } from 'react';
import About from './about';
import myAds from './myAds';
import mySubs from './mySubs';
import EditDetails from './editDetails';
import Messages from './messages';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import '../App.css'

class UserProfile extends Component {
  
    
    render() {
        return (
            <div className="container-fluid" style={{
                "paddingLeft": "0px",
                "paddingRight": "0px",
                "paddingBottom": "50 px"
            }}>
                <nav className="navbar navbar-expand-lg bg-dark ">

                    <ul className="navbar-nav">


                        <li className="nav-item col-lg-2"><a href="#" className="nav-link linknav">Home</a></li>

                        <li className="nav-item col-lg-7"><a href="#" className="nav-link linknav">Post an Ad</a></li>

                        <li className="nav-item col-lg-12"></li>
                        <li className="nav-item col-lg-10"></li>
                        <li className="nav-item dropdown col-lg-6"><a href="#" className="nav-link dropdown-toggle linknav" data-toggle="dropdown">My
            Account</a>
                            <ul className="dropdown-menu">
                                <li className="dropdown-item"><a href='/about'>Profile</a></li>
                                <li className="dropdown-item"><a href='/myAds'>My ads</a></li>
                                <li className="dropdown-item"><a href='/messages'>Inbox</a></li>
                                <li className="dropdown-item">Logout</li>

                            </ul>
                        </li>




                    </ul>
                </nav>



                <div className="container emp-profile">
                    
                        <div className="row">
                            <div className="col-md-4">
                                <div className="profile-img">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS52y5aInsxSm31CvHOFHWujqUx_wWTS9iM6s7BAm21oEN_RiGoog" alt="" />
                                    <div className="file btn btn-lg btn-primary">
                                        Change Photo
                                <input type="file" name="file" />
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 userDetails">
                                <div className="profile-head">
                                    <h5>
                                       My Account
                                    </h5>

                                </div>
                            </div>

                            <div className="col-md-2 userDetails">
                                <div className="profile-work">
                                    <a href="/editDetails">Edit Profile</a><br />
                                </div>
                            </div>
                    
                            <div className="col-md-4">
                                <div className="profile-work">
                                    <p>WORK LINK</p>
                                    <a href='/about'>About</a><br />
                                    <a href="/myAds">My Advertisements </a><br />
                                    <a href="/mySubs">My Subscriptions</a><br />
                                    <a href='/messages'>Inbox</a>
                                </div>
                            </div>
                            <div className="col-md-8 info">
                                <div className="tab-content profile-tab" id="myTabContent">


                                    <Router>


                                        <Switch>
                                            <Route exact path='/about' component={About} />
                                            <Route exact path='/myAds' component={myAds} />
                                            <Route exact path='/mySubs' component={mySubs} />
                                            <Route exact path='/editDetails' component={EditDetails} />
                                            <Route exact path='/messages' component={Messages}/>
                                        </Switch>

                                    </Router>


                                </div>
                            </div>
                        </div>
                    
                </div>
            </div>
        );
    }
}

export default UserProfile;
