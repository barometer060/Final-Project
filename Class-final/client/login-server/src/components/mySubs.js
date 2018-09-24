import React, { Component } from "react";
import "../App.css";

class MySubs extends Component {
  state = {
    show: false,
    myAds: []
  };
  componentDidMount() {
    fetch(
      "http://localhost:8000/rest/api/users/getSubscribedAds/c86cb7fd-fcc0-4531-8b89-bc39895204e9"
    )
      .then(data => {
        return data.json();
      })
      .then(data => {
        this.setState({ myAds: data[0] }, () => {
          this.setState({ show: true });
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    let i = 0;
    const ads = this.state.show ? (
      this.state.myAds.subscriptions.map(ad => {
        return <p key={i++}>{ad}</p>;
      })
    ) : (
      <p>-</p>
    );
    return <div>{ads}</div>;
  }
}

export default MySubs;
