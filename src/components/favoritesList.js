import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert2";

export default class FavoritesList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      favoritesList: [],
      title: "My Saved Quotes"
    };

    this.updateTitle = this.updateTitle.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/favorites")
      .then(response => this.setState({ favoritesList: response.data }))
      .catch(error => console.log(error));
  }

  updateTitle() {
    swal({
      text: "Enter new title here:",
      input: "text"
    }).then(result => {
      console.log(result.value);
      axios
        .put(`/api/favorites/${result.value}`)
        .then(response => this.setState({ title: response.data }))
        .catch(error => console.log(error));
    });

    //  prompt("Please update your favorite list name");
  }

  render() {
    let favorites = this.props.favoriteQuotes.map((element, index) => (
      <div className="fav-item" onClick={() => this.props.delete(index)}>
        <p>{element.quoteText}</p>
        <p>--{element.quoteAuthor}</p>
      </div>
    ));

    return (
      <div className="favorites">
        <h2 style={{ cursor: "pointer" }} onClick={() => this.updateTitle()}>
          <span>{this.state.title}</span>
          <br />
          <p>
            (Click on title to change list name) (Click on a saved quote to
            delete from list)
          </p>
        </h2>

        <div className="fav-list">{favorites}</div>
      </div>
    );
  }
}
