import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert2";
import FavoriteButton from "./FavoriteButton";
import FavoritesList from "./FavoritesList";

export default class QuoteGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: {},
      favoriteQuotes: []
    };

    this.addToFavs = this.addToFavs.bind(this);
    this.deleteFromFavorites = this.deleteFromFavorites.bind(this);
  }

  componentDidMount() {
    axios
      .get("/api/favorites")
      .then(response => {
        console.log(response.data);

        this.setState({ quote: response.data });
      })
      .catch(error => console.log(error));
  }

  addToFavs() {
    let { quote } = this.state;
    if (
      JSON.stringify(this.state.favoriteQuotes).includes(
        JSON.stringify(this.state.quote)
      )
    ) {
      swal("", "This quote is already in your favorites!", "error");
    } else {
      axios
        .post("/api/favorites", { quote })
        .then(response => this.setState({ favoriteQuotes: response.data }));
    }
  }

  changeQuote() {
    axios
      .get("/api/favorites")
      .then(response => {
        this.setState({ quote: response.data });
      })
      .catch(() => this.changeQuote());
  }

  deleteFromFavorites(quote) {
    axios
      .delete(`/api/favorites/${quote}`)
      .then(response => {
        this.setState({ favoriteQuotes: response.data });
      })
      .catch(() => console.log("deletion error"));
  }

  render() {
    const { quote } = this.state;
    // const borderColor = "#b04607";
    var hue =
      "rgb(" +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      "," +
      Math.floor(Math.random() * 256) +
      ")";

    return (
      <div>
        <div className="middle-div">
          <div style={{ color: "white", fontSize: 30 }}>
            Random Quote Generator
          </div>
          <div style={{ border: `10px solid ${hue}` }} className="blockquote">
            <p>{quote.quoteText} </p>
            <br />
            <br />
            <p> --{quote.quoteAuthor} </p>
          </div>
          <div>
            <button
              style={{ border: `3px solid ${hue}` }}
              className="button"
              onClick={() => this.changeQuote()}
            >
              Get A New Quote
            </button>
          </div>
          <div>
            <FavoriteButton add={this.addToFavs} />
          </div>
        </div>

        <div>
          <FavoritesList
            favoriteQuotes={this.state.favoriteQuotes}
            delete={this.deleteFromFavorites}
          />
        </div>
      </div>
    );
  }
}
