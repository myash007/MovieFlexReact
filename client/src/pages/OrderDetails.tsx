import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../assets/stylesheets/OrderDetails.css';
import Pagination from '../components/Pagination';
import star from '../assets/images/star.png';
import emptyOrdersImg from '../assets/images/orders.webp';
import decode from 'jwt-decode';

type OrderDetailsProps = {
  orderId: number;
  userId: any;
  theatreId: any;
  movieId: any;
  orderDate: Date;
  showDate: string;
  showTime: string;
  seats: [];
  orderTotal: number;
  paymentMethod: string;
};

const SearchMovies = () => {
  const navigate = useNavigate();
  const [orderDetails, setOrderDetails] = useState<OrderDetailsProps[]>([]);
  const [movieData, setMovieData] = useState([]);
  var token: any = localStorage.getItem('loginToken');
  var data: any = decode(token);

  console.log(orderDetails);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/get-user-orders/${data.id}`
        );
        console.log(response.data);
        setOrderDetails(response.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, []);
  return (
    <div className='main-od-container container-fluid'>
      <div className='row od-row'>
        <div className='col-lg'>
          {orderDetails.length != 0 ? (
            <div className='od-tableDisplay'>
              <h2 className='order-title'>My Orders</h2>
              <hr />
              <table className='table align-middle'>
                <thead className='thead-dark align-middle'>
                  <tr>
                    {/* <th scope='col'>id</th> */}
                    <th scope='col'>Movie </th>
                    <th scope='col'></th>
                    <th scope='col'>Theatre</th>
                    <th scope='col'>Seats</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>Time</th>
                    <th scope='col'>Price</th>
                  </tr>
                </thead>
                {orderDetails.map((order) => (
                  <tbody>
                    <tr>
                      <td className='od-tableBody .align-middle' colSpan={2}>
                        <img
                          src={order.movieId.image}
                          alt='Movie Not found'
                          className='od-movie-img'
                        />
                        {order.movieId.title}
                      </td>
                      <td className='od-tableBody align-middle'>
                        {order.theatreId.name}
                      </td>
                      <td className='od-tableBody od-movieTitle align-middle'>
                        {' '}
                        <>
                          {order.seats.map((data, index) => (
                            <>
                              {index == order.seats.length - 1
                                ? data
                                : data + ', '}
                            </>
                          ))}{' '}
                        </>
                      </td>
                      <td className='od-tableBody od-movieTitle align-middle'>
                        {order.showDate}
                      </td>

                      <td className='od-tableBody od-movieTitle align-middle'>
                        {order.showTime}
                      </td>

                      <td className='od-tableBody od-movieTitle align-middle'>
                        ${order.orderTotal}
                      </td>
                    </tr>
                  </tbody>
                ))}
              </table>

              {/* <Pagination
          moviesPerPage={moviesPerPage}
          totalMovies={moviesLength}
          paginate={paginate}
        /> */}
            </div>
          ) : (
            <div className='text-center'>
              <img
                src={emptyOrdersImg}
                alt='No Orders'
                className='emptyOrders-img'
              />
              <h2>You haven't purchase any movie tickets with us!</h2>
              <button
                className='btn btn-primary'
                onClick={() => {
                  navigate('/');
                }}
              >
                Continue searching movies
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchMovies;
