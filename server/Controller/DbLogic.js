const mongoose = require('mongoose');
const MovieSchema = require('../models/MovieModel');
const UserSchema = require('../models/UserModel');
const OrderSchema = require('../models/OrderModel');
const TheatreSchema = require('../models/MovieModel');
const MovieSeatsSchema = require('../models/MovieSeatsModel');
const MovieInTheatreSchema = require('../models/MovieInTheatreModel');
var Movie,
  Order,
  MovieSeats,
  Theatre,
  MovieInTheatre,
  User = '';

module.exports = class DbLogic {
  initialize(conn) {
    let databaseConnection = mongoose.createConnection(conn, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    Movie = databaseConnection.model('movies', MovieSchema);
    Order = databaseConnection.model('orders', OrderSchema);
    MovieSeats = databaseConnection.model('movieSeats', MovieSeatsSchema);
    User = databaseConnection.model('users', UserSchema);
    Theatre = databaseConnection.model('theatres', TheatreSchema);
    MovieInTheatre = databaseConnection.model(
      'moviesInTheatres',
      MovieInTheatreSchema
    );
    return databaseConnection.readyState;
  }

  async getAll() {
    return Movie.find({}).lean().exec();
  }

  async getAllMovie() {
    return Movie.find({}).lean().exec();
  }

  async getMovieById(movieId) {
    let result = await Movie.findOne({ id: movieId }).lean().exec();
    return result;
  }

  async updateMovieById(data, id) {
    return Movie.updateOne({ _id: id }, { $set: data }).exec();
  }

  async deleteMovieById(id) {
    return Movie.deleteOne({ _id: id }).exec();
  }

  async addNewMovie(data) {
    let newMovieData = new Movie(data);
    return newMovieData.save();
  }

  async findUser(userEmail) {
    return User.findOne({ email: userEmail }).exec();
  }

  async getAllUser() {
    return User.find({}).lean().exec();
  }

  async getUserById(id) {
    return User.findOne({ _id: id }).lean().exec();
  }

  async getOrdersByUserId(userId) {
    // console.log(userId);
    return Order.find({ userId: userId })
      .populate('movieId')
      .populate('userId')
      .populate('theatreId')
      .lean()
      .exec();
  }

  async getAllOrders() {
    return Order.find({})
      .populate('movieId')
      .populate('userId')
      .populate('theatreId')
      .lean()
      .exec();
  }

  async getRecommendMovie(genres) {
    return await Movie.find({
      'genreList.value': { $in: genres },
    })
      .lean()
      .exec();
  }

  async getName(token) {
    if (token) {
      jwt.verify(token, 'secretkey', (err, decodedToken) => {
        if (decodedToken.name) {
          return decodedToken.name;
        }
      });
    } else {
      res.redirect('/');
    }
  }

  async addNewUser(userData) {
    // let newUserData = new User(userData);
    // return newUserData.save();

    //Testing - Validating existing user
    // console.log(await this.findUser(userData.email));
    let validateUser = await this.findUser(userData.email);
    if (validateUser == null) {
      let newUserData = new User(userData);
      await newUserData.save();
      return true;
    } else {
      return false;
    }
  }

  async updateUser(updatedUserData, id) {
    return User.updateOne({ _id: id }, { $set: updatedUserData }).exec();
  }

  async deleteUser(id) {
    return User.deleteOne({ _id: id }).exec();
  }

  //Theatre and movie in theatre CRUD operations
  async getAllTheatre() {
    return Theatre.find({}).lean().exec();
  }

  async getTheatreById(theatreId) {
    let result = await Theatre.findOne({ _id: theatreId }).lean().exec();
    return result;
  }
  async getMovieInTheatreById(theatreId) {
    let result = await MovieInTheatre.findOne({ theatreId: theatreId })
      .lean()
      .exec();
    return result;
  }

  //Book Movie
  async bookMovie(movieBookingData) {
    let movieBooking = new Order(movieBookingData);
    await movieBooking.save();

    return true;
  }

  //Save movie seats in movieSeats collection
  async saveMovieSeats(movieId, theatreId, seats) {}

  //Update Occupied Seats in movieSeats collection
  async updateOccupiedSeats(theatreId, movieId, showtimeId, seats) {
    return MovieSeats.updateOne(
      {
        theatreId: theatreId,
        movieId: movieId,
        showtimeId: showtimeId,
      },
      { $push: { seatsOccupied: { $each: seats } } }
    ).exec();
  }

  //Fetch movie data to send movie name in mail
  async getMovieByObjId(movieId) {
    let result = await Movie.findOne({ _id: movieId }).lean().exec();
    return result;
  }

  //Check movie seats are occupied or not
  async checkMovieSeats(theatreId, movieId, showtimeId, seats) {
    let result = await MovieSeats.find({
      theatreId: theatreId,
      movieId: movieId,
      showtimeId: showtimeId,
      seatsOccupied: { $in: seats },
    })
      .lean()
      .exec();
    return result;
  }

  //Check movie seats details if exist or not
  async checkMovieSeatsDetails(theatreId, movieId, showtimeId) {
    return await MovieSeats.find({
      theatreId: theatreId,
      movieId: movieId,
      showtimeId: showtimeId,
    })
      .lean()
      .exec();
  }

  //Add Movie seats details in movieDetails collection
  async addMovieSeatsDetails(theatreId, movieId, showtimeId, seats) {
    let movieSeatsInfo = {
      theatreId: theatreId,
      movieId: movieId,
      showtimeId: showtimeId,
      seatsOccupied: seats,
    };
    console.log('movie seat info ' + movieSeatsInfo.seats);
    let movieSeatsData = new MovieSeats(movieSeatsInfo);
    await movieSeatsData.save();
  }
};
