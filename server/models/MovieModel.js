const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MovieSchema = new Schema({
  id: String,
  image: String,
  title: String,
  description: String,
  runtimeStr: String,
  genres: String,
  genreList: [],
  contentRating: String,
  imDbRating: String,
  imDbRatingVotes: String,
  plot: String,
  stars: String,
  starList: [],
});

module.exports = MovieSchema;
