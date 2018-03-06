import React, { Component } from "react";
import "./../styling/App.css";

export default class FavoriteButton extends Component {
  render() {
    return (
      <div>
        <br />
        <button className="fav-btn" onClick={() => this.props.add()} />
        <br />
      </div>
    );
  }
}
