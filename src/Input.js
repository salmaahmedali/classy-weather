import React from "react";

class Input extends React.Component {
  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="search for location"
          value={this.props.location}
          onChange={this.props.onLocation}
        />
      </div>
    );
  }
}
export default Input;
