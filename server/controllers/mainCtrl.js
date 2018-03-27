const axios = require("axios");
const baseUrl = "http://api.forismatic.com/api/1.0/";

// Since there is no database, this is where we will store our data.
let favorites = [];
let randomQuote = [];
let title = "My Saved Quotes";

// Remove selected quote from favorites array and return remaining favorites to front-end.
const deleteFavorite = (req, res, next) => {
  favorites.splice(req.params.quote, 1);
  res.status(200).json(favorites);
};

// Requests for data are recieved here. The server will either return the requested information or
// return a 404 "Not Found" with custom message if data does not exist.
// (4) This method fires off an axios request to the external api using a URL specified in the external api's documentation (Lines 19-20). Once getQuote recieves a response from the external api, a callback function is fired within the .then containing the response data (Lines 21-27). The response is then sent back to the front-end and recieved on line 33 in QuoteGenerator.js -->
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
  if (req.params.id !== typeof undefined) {
    title = req.params.id;
    return res.status(200).json(title);
  }
  res.status(200).json(title);
};

module.exports = {
  getQuote,
  deleteFavorite,
  getFavorites,
  addFavorite,
  updateTitle
};
