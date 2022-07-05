const movie = require('./Controller/Movie.js');
const user = require('./Controller/User.js');
const order = require('./Controller/Order.js');
const theatre = require('./Controller/Theatre.js');
var express = require('express');
var app = express();
var cors = require('cors');
var path = require('path');
var bodyParser = require('body-parser');
const { checkLogin } = require('./middleware/authUser');

var cookieParser = require('cookie-parser');

var port = process.env.PORT || 3000;
app.use(cors());
app.use(bodyParser.urlencoded({ extended: 'true' }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
var config = require('./config/movieDb');

const DbLogic = require('./Controller/DbLogic.js');
const db = new DbLogic();

console.log(config.url);

var statusCode = db.initialize(config.url);
if (statusCode == 2) {
  app.listen(port, () => {
    console.log(`server listening on: ${port}`);
  });
} else {
  console.log('Connection error and Failed to start server.');
}

app.get('/get-movie', movie.getMovie);
app.get('/get-all-movie', movie.getAllMovie);

app.get('/movie/:id', movie.findMovie);
app.post('/add-movie', movie.addMovie);
// app.post('/update-movie', movie.updateMovie);
// app.delete('/delete-movie', movie.deleteMovie);
// app.post('/add-movie', movie.addMovie);

app.get('/get-user-orders/:userId', movie.getOrdersByUserId);
app.get('/get-all-user-orders', movie.getAllOrders);
app.post('/get-recommend-movie', movie.getRecommendMovie);

app.post('/update-movie/:movieId', movie.updateMovie);
app.delete('/delete-movie/:id', movie.deleteMovie);

app.post('/login', user.loginUser);
app.get('/get-user', user.getAllUser);
app.get('/get-user/:id', user.getUserById);
app.post('/register', user.registerUser);

app.post('/update-user', user.updateUser);
app.delete('/delete-user/:id', user.deleteUser);

app.get('/theatreList', theatre.getAllTheatre);
app.get('/theatre/:theatreId', theatre.getTheatreById);
app.get('/movie-theatre-info/:theatreId', theatre.getMovieInTheatreById);

app.post('/bookMovie', order.bookMovie);
app.get(
  '/checkMovieSeats/:movieId/:theatreId/:showtimeId',
  order.checkMovieSeats
);
