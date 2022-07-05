const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkLogin = (req, res, next) => {
  //   console.log('Hello I am in checkLogin middleware');
  const token = req.cookies.tokenCookie;
  if (token) {
    // res.redirect('/');
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (err) {
        //if token is not valid redirect to login page
        //console.log(err.message);
        res.redirect('/login');
      } else {
        //if token is verified then redirect to Homepage
        //console.log('id: ' + decodedToken.id + ',role: ' + decodedToken.role);
        res.status(200).redirect('/');
      }
    });
  } else {
    console.log('Continue creating new login token..');
    next();
  }
};

const authRole = (data) => (req, res, next) => {
  const token = req.cookies.tokenCookie;
  if (token) {
    jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken) => {
      if (data.includes(decodedToken.role)) {
        res.name = decodedToken.name;
        next();
      } else {
        res.render('partials/alert', {
          layout: false,
          errorMsg: 'You are not authorized to access',
        });
      }
    });
  } else {
    res.redirect('/');
  }
};

// const time = 2*24*60*60;
const createToken = (id,role, name) => {
  return jwt.sign({ id,role,name }, process.env.SECRET_KEY);
};

module.exports = { authRole, createToken, checkLogin };
