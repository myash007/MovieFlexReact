import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Navigate } from 'react-router-dom';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import '../assets/stylesheets/Movie.css';
import star from '../assets/images/star.png';
import Card from '../components/Card';

// type MovieDetProps = {};

type MovieDataProps = {
  id: string;
  image: string;
  title: string;
  description: string;
  runtimeStr: string;
  genres: string;
  genreList: string[];
  contentRating: string;
  imDbRating: string;
  imDbRatingVotes: string;
  plot: string;
  stars: string;
  starList: string[];
};

type MovieProps = {
  id: string;
  image: string;
  title: string;
  genres: string;
};

const Movie = () => {
  var navigate = useNavigate();
  const { id } = useParams();
  const [movieData, setMovieData] = useState<MovieDataProps>();
  const [recommendMovie, setRecommendMovie] = useState<MovieProps[]>([]);

  const shuffle = (array: MovieProps[]) => {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    console.log(array);
    return array;
  };

  useEffect(() => {
    const getMovieById = async () => {
      try {
        const url = `http://localhost:4000/movie/${id}`;
        const response = await axios.get(url);
        setMovieData(response.data);
        getRecommendedMovie(response.data.genreList);
      } catch (err) {
        console.log(err);
      }
    };

    const getRecommendedMovie = async (genres: []) => {
      const response = await axios.post(
        'http://localhost:4000/get-recommend-movie',
        JSON.stringify({genres}),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if(response.data.status)
      {
        const shuffledMovie = shuffle(response.data.result);
        setRecommendMovie(shuffledMovie);
      }else{
        alert(response.data.msg);
      }
    };
    
    getMovieById();
  }, [id]);

  


  var allStars: string[] = [];
  if (movieData?.stars != null) {
    allStars = movieData?.stars.split(',');
  }
  // const allStars = movieData?.stars.split(',');
  // console.log(allStars);
  const movieImg = movieData?.image;
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
        <div className='col-lg-4 movie-col'>
          <img src={movieImg} alt='Movie not found' className='movie-img' />
        </div>
        <div className='col-lg movie-det-col'>
          <div className='movie-title'>{movieData?.title}</div>
          <div className='general-info'>
            <span className='content-rating'>{movieData?.contentRating}</span>
            <span className='movie-genres'>{movieData?.genres}</span>
            <span className='runtime '>{movieData?.runtimeStr}</span>
          </div>
          {movieData?.plot != null ? (
            <div className='overview'>
              <h3>Overview</h3>
              <span className='plot'>{movieData?.plot}</span>
            </div>
          ) : (
            ''
          )}
          {movieData?.imDbRating != null ? (
            <div className='imdb-ratings'>
              <h3>IMDB Ratings</h3>
              <span className='imdb-rating'>
                <img src={star} alt='Not available' className='star-img' />
                {movieData?.imDbRating}/10
              </span>
            </div>
          ) : (
            ''
          )}
          {allStars.length != 0 ? (
            <div className='stars-list'>
              <h3>Cast</h3>
              <ul className='star-list'>
                {allStars?.map((star) => (
                  <li>{star}</li>
                ))}
              </ul>
            </div>
          ) : (
            ''
          )}
          <div className='book-ticket-btn'>
            <Button
              variant='primary'
              type='submit'
              className='book-tkt-btn'
              onClick={() => navigate(`/book-ticket/${id}`)}
            >
              Book Tickets
            </Button>
          </div>
        </div>
      </div>
      <div className='rows recommended-movie-row'>
        <div className='col recommended-movie-col'>
          <h1>Recommended Movies</h1>
          <div className='card-grid-container'>
          {recommendMovie.slice(0, 5).map((movie) => (
            <a href={`${movie.id}`} className='movie-links'>
              <div className='card-grid-item'>
                <Card
                  id={movie.id}
                  title={movie.title}
                  genres={movie.genres}
                  imgUrl={movie.image}
                  key={movie.id}
                />
              </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Movie;
