import React, { Component } from "react";
import "./InputItem.css";

class InputItem extends Component {
  state = {
    value: ""
  };

  handleChange = e => {
    const { value, id } = e.target;
    this.setState({ value: value });
    this.props.onInputChange(id, value);
  };

  render() {
    return (
      <div className="form-group">
        <label htmlFor={this.props.id} className="sr-only">
          {this.props.label}
        </label>
        <input
          type={this.props.type}
          className="form-control my-4"
          id={this.props.id}
          value={this.state.value}
          onChange={this.handleChange}
          placeholder={this.props.label}
        />
      </div>
    );
  }
}

export default InputItem;
