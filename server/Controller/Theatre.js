const DbLogic = require('./DbLogic.js');
const db = new DbLogic();

//Get all theatre info list from theatres collection
const getAllTheatre = (req, res, next) => {
  db.getAllTheatre().then(function (result) {
    res.send(result);
  });
};

//Get theatre info by theatreId from theatres collection
const getTheatreById = (req, res, next) => {
  let theatreId = req.params.theatreId;
  db.getTheatreById(theatreId).then(function (result) {
    res.send(result);
  });
};

//Get movie in theatre info from movieIntheatres collection by theatreId, to get available showTimes, occupied seats
const getMovieInTheatreById = (req, res, next) => {
  let theatreId = req.params.theatreId;
  db.getMovieInTheatreById(theatreId).then(function (result) {
    res.send(result);
  });
};

module.exports = { getAllTheatre, getTheatreById, getMovieInTheatreById };
