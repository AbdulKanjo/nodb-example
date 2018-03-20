const axios = require("axios");
const baseUrl = "http://api.forismatic.com/api/1.0/";

// Since there is no database, this is where we will store our data.
let favorites = [];
let randomQuote = [];
let title = "My Saved Quotes";

// Remove selected quote from favorites array and return remaining favorites to front-end.
const deleteFavorite = (req, res, next) => {
  favorites.splice(req.params.id, 1);
  res.status(200).json(favorites);
};

// Requests for data are recieved here. The server will either return the requested information or
// return a 404 "Not Found" with custom message if data does not exist.
const getQuote = (req, res, next) => {
  axios
    .get(`${baseUrl}?method=getQuote&format=json&lang=en`)
    .then(
      response =>
        response.data.quoteText
          ? res.status(200).json(response.data)
          : res.status(404).send("No data found")
    )
    .catch(error => error);
};

const getFavorites = (req, res, next) => {
  res.status(200).json(favorites);
};

// Add a new favorite onto the end of the favorites array.
const addFavorite = (req, res, next) => {
  favorites.push(req.body.quote);
  res.status(200).json(favorites);
};

// Update favorites title
const updateTitle = (req, res, next) => {
  title = req.params.id;
  res.status(200).json(title);
};

module.exports = {
  getQuote,
  deleteFavorite,
  getFavorites,
  addFavorite,
  updateTitle
};
