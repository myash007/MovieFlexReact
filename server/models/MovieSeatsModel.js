const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSeatsModelSchema = new Schema(
  {
    theatreId: { type: String, ref: 'theatres' },
    movieId: { type: String, ref: 'movies' },
    showtimeId: String,
    seatsOccupied: [],
  },
  { collection: 'movieSeats' }
);

module.exports = MovieSeatsModelSchema;
