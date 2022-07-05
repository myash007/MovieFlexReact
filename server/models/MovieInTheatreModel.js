const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieInTheatreSchema = new Schema(
  {
    theatreId: { type: String, ref: 'theatres' },
    movieId: { type: String, ref: 'movies' },
    showTimes: [],
    ticketPrices: [],
    seatsOccupied: [],
  },
  { collection: 'moviesInTheatres' }
);

module.exports = MovieInTheatreSchema;
