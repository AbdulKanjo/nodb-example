import React, { Component } from "react";
import QuoteGenerator from "./QuoteGenerator/QuoteGenerator";
import "./App.css";

export default class App extends Component {
  render() {
    return (
      <div className="parent-container">
        <QuoteGenerator />
      </div>
    );
  }
}
