import React, { Component } from "react";
import "./styling/App.css";
import QuoteGenerator from "./components/QuoteGenerator";

class App extends Component {
  render() {
    return (
      <div className="parent-container">
        <QuoteGenerator />
      </div>
    );
  }
}

export default App;
