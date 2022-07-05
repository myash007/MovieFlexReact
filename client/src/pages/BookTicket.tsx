import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';
import { Form, Button, Dropdown } from 'react-bootstrap';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import '../assets/stylesheets/Movie.css';
import '../assets/stylesheets/BookTicket.css';
import star from '../assets/images/star.png';
import { url } from 'inspector';

type MovieDataProps = {
  _id: string;
  id: string;
  image: string;
  title: string;
  description: string;
  genres: string;
};

type TheatresDataProps = {
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

type MovieInTheatresDataProps = {
  theatreId: string;
  movieId: string;
  showTimes: [];
  ticketPrices: [];
  seatsOccupied: [];
};

type ShowtimeDataProps = {
  showtimeId: string;
  time: string;
};

const seats = Array.from({ length: 8 * 8 }, (_, i) => i + 1);

const BookTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movieData, setMovieData] = useState<MovieDataProps>();
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState<{ showtimeId: string }>({
    showtimeId: '',
  });
  const [theatreList, setTheatreList] = useState<TheatresDataProps[]>([]);
  const [movieInTheatre, setMovieInTheatre] =
    useState<MovieInTheatresDataProps>();
  const [showtime, setShowTime] = useState<ShowtimeDataProps[]>([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [occupiedSeats, setOccupiedSeats] = useState([]);

  // const defaultTheatre = theatreList.map((theatre, idx) => {
  //   if (idx === 0) {
  //     return theatre._id;
  //   }
  // });

  // console.log(defaultTheatre);
  const [movieBookingForm, setMovieBookingForm] = useState({
    location: '62bf2d0557ffb4bb95cac5c6',
    selectedDate: '',
    selectedTime: '',
  });

  const movieImg = movieData?.image;
  const movieUrl = `/movie/${id}`;
  const movieName = movieData?.title;
  const totalSeats = selectedSeats.length;

  const getMovieSeatsData = {
    movieId: movieData?._id,
    showtimeId: radioValue.showtimeId,
    theatreId: movieBookingForm.location,
  };

  const checkMovieOccupiedSeats = async () => {
    if (
      getMovieSeatsData.movieId != '' &&
      getMovieSeatsData.theatreId != '' &&
      getMovieSeatsData.showtimeId != ''
    ) {
      const checkMovieSeatsUrl = `http://localhost:4000/checkMovieSeats/${getMovieSeatsData.movieId}/${getMovieSeatsData.theatreId}/${getMovieSeatsData.showtimeId}`;
      console.log(checkMovieSeatsUrl);
      const checkMovieSeats = await axios.get(checkMovieSeatsUrl);

      if (checkMovieSeats.data.length != 0) {
        setOccupiedSeats(checkMovieSeats.data[0].seatsOccupied);
        console.log(
          'checkMovieSeats function' + checkMovieSeatsUrl,
          checkMovieSeats.data[0].seatsOccupied
        );
      } else {
        setOccupiedSeats([]);
        setSelectedSeats([]);
        console.log([]);
      }
    } else {
      console.log([]);
    }
  };

  useEffect(() => {
    const fetchMovieTheatreData = async () => {
      try {
        const getMovieDataUrl = `http://localhost:4000/movie/${id}`;
        const getTheatreListUrl = 'http://localhost:4000/theatreList';
        const getMovieInTheatreListUrl = `http://localhost:4000/movie-theatre-info/${movieBookingForm.location}`;

        const respMovie = await axios.get(getMovieDataUrl);
        const respTheatreList = await axios.get(getTheatreListUrl);
        const respMovieInTheatre = await axios.get(getMovieInTheatreListUrl);

        setMovieData(respMovie.data);

        setTheatreList(respTheatreList.data);

        setMovieInTheatre(respMovieInTheatre.data);

        setShowTime(respMovieInTheatre.data.showTimes);

        // setOccupiedSeats(checkMovieSeats.data.seatsOccupied);
        // setOccupiedSeats(respMovieInTheatre.data.seatsOccupied);
        setSelectedSeats([]);
        if (
          movieBookingForm.location != '' &&
          movieBookingForm.selectedTime != ''
        ) {
          checkMovieOccupiedSeats();
        }
      } catch (err) {
        console.log(err);
      }
    };
    fetchMovieTheatreData();
  }, [movieBookingForm.location, movieBookingForm.selectedTime, id]);

  console.log(movieBookingForm);

  //Handling Date selection in form
  const disablePastDate = () => {
    const today = new Date();
    const dd = String(today.getDate() + 1).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    return yyyy + '-' + mm + '-' + dd;
  };
  const disableAfterTwoDate = () => {
    const today = new Date().toISOString().split('T')[0];
    var twoWeek = new Date(new Date().getTime() + 14 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split('T')[0];
    return twoWeek;
  };
  //---End of handling Date Selection---

  //Update and handleFormSubmit methods
  const updateMovieBookingForm = (value: object) => {
    return setMovieBookingForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleMovieBookingFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    // console.log({ registerForm });

    //by default it will submit the form, so prevent it using preventDefault method
    e.preventDefault();
    // const bookMovie = { ...movieBookingForm };s

    if (
      movieBookingForm.location != '' &&
      movieBookingForm.selectedDate != '' &&
      movieBookingForm.selectedTime != '' &&
      selectedSeats.length != 0
    ) {
      setMovieBookingForm({
        location: '',
        selectedDate: '',
        selectedTime: '',
      });
      navigate('/checkout', {
        state: {
          movieId: id,
          showtimeId: radioValue.showtimeId,
          showSelectionDetails: movieBookingForm,
          seats: selectedSeats,
        },
      });
    } else if (movieBookingForm.location == '') {
      alert('Please select the theatre location');
    } else if (movieBookingForm.selectedDate == '') {
      alert('Please select the movie date');
    } else if (movieBookingForm.selectedTime == '') {
      alert('Please select the movie time');
    } else if (selectedSeats.length == 0) {
      alert('Please select the seats');
    } else {
    }
  };
  //---End of Update and handleFormSubmit methods---

  //Book ticket rendering
  return (
    <div className='container-fluid movie'>
      <div className='row movie-poster-row'>
        <div className='col movie-poster-col'>
          <div className='movie-det-section'>
            <img
              src={movieImg}
              alt='Movie not found'
              className='movie-poster'
            />
          </div>
        </div>
      </div>

      <div className='row movie-det-row'>
        <div className='col-lg-5 movie-col'>
          <a href={movieUrl}>
            <img src={movieImg} alt='Movie not found' className='movie-img' />
          </a>
        </div>
        <div className='col-lg-7 movie-det-col'>
          <div className='col-lg-10 movie-form book-ticket-form'>
            <a href={movieUrl} className='bt-movie-name-link'>
              <h2 style={{ color: 'black' }} className='bt-movie-name'>
                {movieName}
              </h2>
              <hr />
            </a>
            <h2 style={{ color: 'black' }}>Book Ticket</h2>
            <Form onSubmit={handleMovieBookingFormSubmit}>
              <Form.Group className='mb-3' controlId='location'>
                <Form.Label style={{ color: 'black' }}>
                  Choose Theater
                </Form.Label>
                <br />
                <select
                  required
                  name='location'
                  className='form-control'
                  onChange={(e) =>
                    updateMovieBookingForm({ location: e.target.value })
                  }
                >
                  <option disabled>--Select Location--</option>
                  {theatreList.map((theatre) => (
                    <option key={theatre.name} value={theatre._id}>
                      {' '}
                      {theatre.name}
                    </option>
                  ))}
                </select>
                <Form.Text className='text-muted'>
                  Select your nearest location to save your time.
                </Form.Text>
              </Form.Group>
              <Form.Group className='mb-3' controlId='date'>
                <Form.Label style={{ color: 'black' }}>Select Date</Form.Label>
                <Form.Control
                  required
                  type='date'
                  min={disablePastDate()}
                  max={disableAfterTwoDate()}
                  placeholder='Choose Date'
                  value={movieBookingForm.selectedDate}
                  onChange={(e) =>
                    updateMovieBookingForm({ selectedDate: e.target.value })
                  }
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='date'>
                <Form.Label style={{ color: 'black' }}>Select Time</Form.Label>
                <br />

                <ToggleButtonGroup type='radio' name='options'>
                  {showtime.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      className='radio-showTime'
                      type='radio'
                      variant={
                        radioValue.showtimeId == radio.showtimeId
                          ? 'primary'
                          : 'outline-primary'
                      }
                      name='radio'
                      value={radio.showtimeId}
                      onChange={(e) => {
                        updateMovieBookingForm({
                          selectedTime: radio.time,
                        });
                        setRadioValue({ showtimeId: e.target.value });
                      }}
                    >
                      <span className='r-showTimes'>{radio.time}</span>
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
              </Form.Group>
              <Form.Group className='mb-3' controlId='location'>
                <Form.Label style={{ color: 'black' }}>
                  Seat Selection
                </Form.Label>
                <ShowCase />
                <Cinema
                  occupiedSeats={occupiedSeats}
                  selectedSeats={selectedSeats}
                  onSelectedSeatsChange={(selectedSeats: any) =>
                    setSelectedSeats(selectedSeats)
                  }
                />
              </Form.Group>

              {selectedSeats.length != 0 ? (
                <span className='seats-selected'>
                  Seat(s) selected: {''}
                  {selectedSeats.map((seat, idx) => (
                    <span className='displaySeatSelection'>{seat}</span>
                  ))}
                  <br />
                </span>
              ) : (
                ''
              )}
              <br />
              <Button variant='primary' type='submit'>
                Proceed To Order
              </Button>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

//Seat Selection

function Cinema({ occupiedSeats, selectedSeats, onSelectedSeatsChange }: any) {
  function handleSelectedState(seat: any) {
    const isSelected = selectedSeats.includes(seat);
    if (isSelected) {
      onSelectedSeatsChange(
        selectedSeats.filter((selectedSeat: any) => selectedSeat !== seat)
      );
    } else {
      onSelectedSeatsChange([...selectedSeats, seat]);
    }
  }

  return (
    <div className='Cinema'>
      <div className='screen' />

      <div className='seats'>
        {seats.map((seat) => {
          const isSelected = selectedSeats.includes(seat);
          const isOccupied = occupiedSeats.includes(seat);
          return (
            <span
              // tabIndex=0
              key={seat}
              className={clsx(
                'seat',
                isSelected && 'selected',
                isOccupied && 'occupied'
              )}
              onClick={isOccupied ? undefined : () => handleSelectedState(seat)}
            />
          );
        })}
      </div>
    </div>
  );
}
function ShowCase() {
  return (
    <ul className='ShowCase'>
      <li>
        <span className='seat' /> <small>Available</small>
      </li>
      <li>
        <span className='seat selected' /> <small>Selected</small>
      </li>
      <li>
        <span className='seat occupied' /> <small>Occupied</small>
      </li>
    </ul>
  );
}

export default BookTicket;
