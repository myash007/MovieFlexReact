import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Form, Button, CloseButton, Modal, ModalHeader } from 'react-bootstrap';
import '../assets/stylesheets/Checkout.css';
import decode from 'jwt-decode';

type PaymentModalPropTypes = {
  show: boolean;
  onHide: () => void;
  showack: () => void;
  submitorderdetails: () => void;
};

type AcknowledgeModalPropTypes = {
  status: any;
  show: boolean;
  onHide: () => void;
};

type MovieDataProps = {
  _id: string;
  id: string;
  image: string;
  title: string;
  description: string;
  genres: string;
};

type TheatreDataProps = {
  _id: string;
  name: string;
  address1: string;
  address2: string;
  city: string;
  zipcode: string;
  province: string;
  country: string;
  contact: string;
};

type MovieBookingStatusProps = {
  msg: string;
  status: boolean;
};

const Checkout = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { movieId, showtimeId, showSelectionDetails, seats }: any = state;
  const [movieData, setMovieData] = useState<MovieDataProps>();
  const [theatreData, setTheatreData] = useState<TheatreDataProps>();
  const [paymentModalShow, setPaymentModalShow] = useState(false);
  const [acknowledgeModalShow, setAcknowledgeModalShow] = useState(false);
  const [movieBookingStatus, setMovieBookingStatus] =
    useState<MovieBookingStatusProps>();
  var token: any = localStorage.getItem('loginToken');
  var data: any = decode(token);

  useEffect(() => {
    const fetchMovieTheatreData = async () => {
      try {
        const getMovieDataUrl = `http://localhost:4000/movie/${movieId}`;

        const getTheatreInfoUrl = `http://localhost:4000/theatre/${showSelectionDetails.location}`;

        const respMovie = await axios.get(getMovieDataUrl);

        const respTheatre = await axios.get(getTheatreInfoUrl);

        setMovieData(respMovie.data);

        setTheatreData(respTheatre.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovieTheatreData();
  }, [movieId]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const date = new Date(showSelectionDetails.selectedDate.replace(/-/g, '/'));
  let year = date.getFullYear();
  let month = months[date.getMonth()];
  let day = date.getDate();
  const showDate = `${month} ${day}, ${year}`;

  let ticketRate = 13.5;
  let numberOfTickets = seats.length;
  let subtotal = ticketRate * numberOfTickets;
  let taxOnTickets = (subtotal * 13) / 100;
  let orderTotal = subtotal + taxOnTickets;
  let userId = data.id;
  let movieOId = movieData?._id;

  const submitMovieOrder = async () => {
    const movieShowDetails = {
      movieOId,
      showtimeId,
      userId,
      ...showSelectionDetails,
      seats,
      orderTotal,
    };
    console.log(movieShowDetails);
    try {
      const postOrderDetailsUrl = `http://localhost:4000/bookMovie`;

      const respOrder = await axios.post(
        postOrderDetailsUrl,
        JSON.stringify(movieShowDetails),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      console.log(respOrder.data);
      setMovieBookingStatus(respOrder.data);
    } catch (err) {
      console.log(err);
    }
    // navigate('/');
  };

  return (
    <div className='container-fluid checkout'>
      <div className='row checkout-row'>
        <div className='col-lg-4 checkout-col-img'>
          <img
            src={movieData?.image}
            className='movie-main-img'
            alt='Movie not found'
          />
        </div>
        <div className='col-lg-8 checkout-col'>
          <h1 className='ck-movie-title'>{movieData?.title}</h1>
          <div className='showDateAndTime'>
            <span className='show-info'>
              <span className='showDateTitle text-muted small'>DATE</span>
              <br />
              <span className='showDate font-weight-bold'>{showDate}</span>
            </span>
            <div className='show-info'>
              <span className='showTimeTitle text-muted small'>TIME</span>
              <br />
              <span className='showTime font-weight-bold'>
                {showSelectionDetails.selectedTime}
              </span>
            </div>
            <div className='show-info'>
              <span className='locationTitle text-muted small'>LOCATION</span>
              <br />
              <span className='locationName font-weight-bold'>
                {theatreData?.name}
              </span>
            </div>
            <div className='show-info'>
              <span className='locationTitle text-muted small'>Seats</span>
              <br />
              <span className='locationName font-weight-bold'>
                <>
                  {seats.map((seat: any, idx: any) => (
                    <>{idx == seats.length - 1 ? seat : seat + ', '}</>
                  ))}{' '}
                </>
              </span>
            </div>
          </div>
          <hr />
          <div className='ck-order-title'>
            <h1 className='ck-movie-title'>Order Summary</h1>
            <div className='movie-price-summary'>
              <div className='movie-price-det'>
                <span className='movie-price-det-item text-muted'>
                  Movie Tickets({seats.length})
                </span>
                <span className='movie-price-det-value text-muted'>
                  ${subtotal.toFixed(2)}
                </span>
              </div>
              <div className='movie-price-det'>
                <span className='movie-price-det-item text-muted'>Taxes</span>
                <span className='movie-price-det-value text-muted'>
                  ${taxOnTickets.toFixed(2)}
                </span>
              </div>
              <div className='movie-price-det'>
                <span className='movie-price-det-item font-weight-bold'>
                  Total
                </span>
                <span className='movie-price-det-value font-weight-bold'>
                  ${orderTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
          <Button
            variant='primary'
            className='proceedBtn'
            onClick={() => setPaymentModalShow(true)}
          >
            Proceed to Pay
          </Button>

          <PaymentFormModal
            show={paymentModalShow}
            onHide={() => setPaymentModalShow(false)}
            showack={() => {
              setPaymentModalShow(false);
              setAcknowledgeModalShow(true);
            }}
            submitorderdetails={() => {
              submitMovieOrder();
            }}
          />

          <AcknowledgeModal
            status={movieBookingStatus}
            show={acknowledgeModalShow}
            onHide={() => setAcknowledgeModalShow(false)}
          />
        </div>
      </div>
    </div>
  );
};

const PaymentFormModal = (props: PaymentModalPropTypes) => {
  const handleMovieOrderFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    {
      props.submitorderdetails();
    }
    {
      props.showack();
    }
  };
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Header>
        <Modal.Title id='contained-modal-title-vcenter'>
          Payment Information
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className='payment-modal-body'>
          <h4>
            Payment Method <br />
            <i className='fa-brands fa-cc-visa visa-icon'></i>
          </h4>
          <div className='payment-form'>
            <Form onSubmit={handleMovieOrderFormSubmit}>
              <Form.Group className='mb-3' controlId='cardName'>
                <Form.Label>Card name</Form.Label>
                <Form.Control
                  required
                  type='text'
                  // id='name'
                  placeholder='Card name'
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='cardNumber'>
                <Form.Label>Card number</Form.Label>
                <Form.Control
                  required
                  type='number'
                  // id='userEmail'
                  placeholder='Card number'
                />
              </Form.Group>

              <Form.Group className='mb-3' controlId='cardNumber'>
                <Form.Label>Expiry</Form.Label>
                <Form.Control
                  required
                  type='text'
                  // id='userEmail'
                  placeholder='MM/YY'
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='cardNumber'>
                <Form.Label>CVC</Form.Label>
                <Form.Control
                  required
                  type='number'
                  // id='userEmail'
                  placeholder='XXX'
                />
              </Form.Group>
              <Button type='submit'>Proceed</Button>
            </Form>
          </div>
        </div>
      </Modal.Body>
      {/* <Modal.Footer>
        <Button onClick={props.onHide}>Proceed</Button>
      </Modal.Footer> */}
    </Modal>
  );
};

const AcknowledgeModal = (props: AcknowledgeModalPropTypes) => {
  const navigate = useNavigate();
  return (
    <Modal
      {...props}
      size='lg'
      aria-labelledby='contained-modal-title-vcenter'
      centered
    >
      <Modal.Body>
        {props.status?.status ? (
          <>
            <h4>{props.status?.msg}</h4>
            <p className='text-muted'>
              Please check your inbox, we have sent you an mail with movie
              booking details.
            </p>
          </>
        ) : (
          <h4>{props.status?.msg}</h4>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={() => navigate('/')}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};
export default Checkout;
