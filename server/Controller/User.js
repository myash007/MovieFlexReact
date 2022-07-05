const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {
  getName,
  authRole,
  createToken,
  checkLogin,
} = require('../middleware/authUser');
require('dotenv').config();
const DbLogic = require('./DbLogic.js');
const db = new DbLogic();

var isLoggedIn = false;
var name = '';

const loginUser = function (req, res) {
  // console.log('Hello I am in loginUser fucntion');
  const userEmail = req.body.userEmail;
  const userPassword = req.body.userPassword;
  db.findUser(userEmail)
    .then(function (result) {
      if (result == null || result == undefined) {
        res.send({msg: 'Invalid User Email or Password',isLoggedIn: false});
      } else {
        bcrypt.compare(userPassword, result.password).then((data) => {
          if (data == true) {
            console.log()
            const token = createToken((result._id).valueOf(),result.role, result.name);
            // console.log(token);
            isLoggedIn = true;
            name = result.name;
            // const time = 2*24*60*60;
            // res.cookie('tokenCookie', token, { httpOnly: true });
            res.send({msg: 'User LoggedIn Successfully', token: token, isLoggedIn: true});
          } else {
            res.send({msg: 'Invalid Login Credentials', isLoggedIn: false});
          }
        });
      }
    })
    .catch((error) => {
      res.status(400).json({
        error: error,
      });
    });
};

const registerUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(req.body.userPassword, salt);
  // console.log(encryptedPassword);
  var userData = {
    name: req.body.name,
    email: req.body.userEmail,
    password: encryptedPassword,
    phoneNumber: req.body.phoneNumber,
    role: 'user',
  };
  // console.log(userData, req.body.name); //Testing Register Form
  db.addNewUser(userData).then(function (result) {
    if (result) {
      res.status(200).send('User Added');
    } else {
      res.status(200).send('User Email already exists, please try again!');
    }
  });
};

const updateUser = async (req, res) => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(req.body.password, salt);
  const id = req.body.id;
  var updatedUserData = {
    name: req.body.name,
    password: encryptedPassword,
    phoneNumber: req.body.phoneNumber,
  };
  // console.log(userData, req.body.name); //Testing Register Form
  db.updateUser(updatedUserData,id).then(function (result) {
    if (result) {
      res.status(200).send({msg: 'User Updated', status: true});
    } else {
      res.status(200).send({msg: 'Error Updating User Details', status: true});
    }
  });
};

const deleteUser = async (req, res) => {
  const id = req.params.id;
  // console.log(userData, req.body.name); //Testing Register Form
  db.deleteUser(id).then(function (result) {
    if (result) {
      res.status(200).send({msg: 'User Deleted Successfully', status: true});
    } else {
      res.status(200).send({msg: 'Error deleting User', status: true});
    }
  });
};

const getAllUser = (req, res, next) => {
  db.getAllUser().then(function (result) {
    res.send(result);
  });
};

const getUserById = (req, res, next) => {
  var id = req.params.id;
  db.getUserById(id).then(function (result) {
    res.send(result);
  });
};

module.exports = { loginUser, registerUser,getAllUser,getUserById,updateUser,deleteUser };
