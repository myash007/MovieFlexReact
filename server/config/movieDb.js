const dotenv = require('dotenv');
const result = dotenv.config();
const username = process.env.USERINFO;
const password = process.env.PASS;
const database = process.env.DATABASE;

//Vishal's MongoDB connection url

module.exports = {
  url:
    'mongodb+srv://' +
    username +
    ':' +
    password +
    '@cluster0.dc0fv.mongodb.net/' +
    database +
    '?retryWrites=true&w=majority',
};

//Vrushank's MongoDB connection url

// module.exports = {
//   url:
//     'mongodb+srv://' +
//     username +
//     ':' +
//     password +
//     '@cluster0.ona7y.mongodb.net/' +
//     database +
//     '?retryWrites=true&w=majority',
// };
