const DbLogic = require('./DbLogic.js');
const db = new DbLogic();

const getMovie = (req, res, next) => {
  db.getAll().then(function (result) {
    res.send(result);
  });
};

const getAllMovie = (req, res, next) => {
  db.getAllMovie().then(function (result) {
    res.send(result);
  });
};

//Function to find movie by id
const findMovie = (req, res, next) => {
  let movieId = req.params.id;
  db.getMovieById(movieId).then(function (result) {
    res.send(result);
  });
};

const addMovie = (req, res, next) => {
  var genreList = req.body.genres.split(",").map(x => ({ 
    key: x, 
    value: x 
  }));
  var newMovieData = {
    id: req.body.id,
    image: req.body.image,
    title: req.body.title,
    plot: req.body.plot,
    runtimeStr: req.body.runtimeStr,
    genres: req.body.genres,
    contentRating: req.body.contentRating,
    genreList: genreList,
    stars: req.body.stars,
  };
  console.log(newMovieData);
  db.addNewMovie(newMovieData).then(function (result) {
    res.send({ msg: 'Movie Added Successfully', status: true });
  });
};

const updateMovie = (req, res, next) => {
  let movieId = req.params.movieId;
  var genreList = req.body.genres.split(",").map(x => ({ 
    key: x, 
    value: x 
  }));
  var updatedMovieData = {
    title: req.body.title,
    genreList: genreList,
    genres: req.body.genres,
    imDbRating: req.body.imDbRating,
    stars: req.body.stars,
  };
  db.updateMovieById(updatedMovieData, movieId).then(function (result) {
    res.send({msg: 'Movie Updated Successfully', status: true});
  });
};

const deleteMovie = (req, res, next) => {
  let movieId = req.params.id;
  db.deleteMovieById(movieId).then(function (result) {
    res.send({ msg: 'Movies Deleted', status: true });
  });
};

const getOrdersByUserId = (req, res, next) => {
  
  const userId = req.params.userId;
  db.getOrdersByUserId(userId).then(function (result) {
    res.send(result);
  });
};

const getAllOrders = (req, res, next) => {
  db.getAllOrders().then(function (result) {
    res.send(result);
  });
};

const getRecommendMovie = (req, res, next) => {
  if (req.body.genres != undefined && req.body.genres != null) {
    genreArr = req.body.genres.map(function (obj) {
      return obj.value;
    });
    db.getRecommendMovie(genreArr).then(function (result) {
      // console.log(result.length);
      res.send({ result: result, msg: "Found Movies", status: true });
    });
  } else {
    res.send({ msg: "No Recommended Movie found", status: false });
  }

};

module.exports = { addMovie, getMovie, updateMovie, deleteMovie, findMovie, getAllMovie, getOrdersByUserId, getRecommendMovie,getAllOrders };
