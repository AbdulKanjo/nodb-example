import React, { Component } from "react";
import axios from "axios";
import swal from "sweetalert2";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import FavoriteList from "../FavoriteList/FavoriteList";
import "./QuoteGenerator.css";

export default class QuoteGenerator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      quote: {},
      favoriteQuotes: [],
      color: ""
    };

    this.addFavorite = this.addFavorite.bind(this);
    this.deleteFavorite = this.deleteFavorite.bind(this);
  }

  componentDidMount() {
    this.newQuote();
    this.getFavorites();
  }

  // Get a new random quote.
  newQuote() {
    axios
      .get("/api/favorites/quote")
      .then(response => {
        this.setState({ quote: response.data });
        this.setState({
          color: "#" + (((1 << 24) * Math.random()) | 0).toString(16)
        });
      })
      .catch(() => this.newQuote());
  }

  // Get the whole list of favorites.
  getFavorites() {
    axios
      .get("/api/favorites")
      .then(response => this.setState({ favoriteQuotes: response.data }))
      .catch(error => console.log(error));
  }

  // Add current quote to favorite list.
  addFavorite() {
    let { quote, favoriteQuotes } = this.state;
    if (JSON.stringify(favoriteQuotes).includes(JSON.stringify(quote))) {
      swal("", "This quote is already in your favorites!", "error");
    } else {
      axios
        .post("/api/favorites", { quote })
        .then(response => this.setState({ favoriteQuotes: response.data }));
    }
  }

  // Delete selected quote from favorite list.
  deleteFavorite(quote) {
    axios
      .delete(`/api/favorites/${quote}`)
      .then(response => this.setState({ favoriteQuotes: response.data }))
      .catch(error => console.log(error));
  }

  render() {
    const { quote, favoriteQuotes, color } = this.state;
    return (
      <div>
        <div className="quote-container">
          <div style={{ color: "white", fontSize: 30 }}>
            Random Quote Generator
          </div>
          <div style={{ border: `10px solid ${color}` }} className="blockquote">
            <p>{quote.quoteText} </p>
            <br />
            <br />
            <p> --{quote.quoteAuthor} </p>
          </div>
          <div className="btn-box">
            <button
              style={{ border: `3px solid ${color}` }}
              className="button"
              onClick={() => this.newQuote()}
            >
              Get A New Quote
            </button>
            <FavoriteButton add={this.addFavorite} />
          </div>
        </div>
        <div>
          <FavoriteList
            favoriteQuotes={favoriteQuotes}
            delete={this.deleteFavorite}
          />
        </div>
      </div>
    );
  }
}
