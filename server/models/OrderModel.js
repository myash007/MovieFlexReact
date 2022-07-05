const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema(
  {
    userId: { type: String, ref: 'users' },
    theatreId: { type: String, ref: 'theatres' },
    movieId: { type: String, ref: 'movies' },
    orderDate: Date,
    showDate: String,
    showTime: String,
    seats: [],
    orderTotal: Number,
    paymentMethod: String,
  },
  { collection: 'orders' }
);

module.exports = OrderSchema;
