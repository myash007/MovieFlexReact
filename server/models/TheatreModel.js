const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TheatreSchema = new Schema(
  {
    name: String,
    address1: String,
    address2: String,
    city: String,
    zipcode: String,
    province: String,
    country: String,
    contact: String,
  },
  { collection: 'theatres' }
);

module.exports = TheatreSchema;
