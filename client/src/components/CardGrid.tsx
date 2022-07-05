import React, { useState, useEffect } from 'react';
import Card from './Card';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import '../assets/stylesheets/CardGrid.css';

type CardGridProps = {};

type MovieProps = {
  // title: string;
  // genres: string[];
  // released: string;
  // poster: string;

  id: string;
  image: string;
  title: string;
  genres: string;
};

const CardGrid = (props: CardGridProps) => {
  const [movies, setMovies] = useState<MovieProps[]>([]);
  const [randomMovies, setRandomMovies] = useState<MovieProps[]>([]);

  useEffect(() => {
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
      return array;
    };
    const getMovies = async () => {
      try {
        const response = await axios.get('http://localhost:4000/get-movie');
        const moviesData = shuffle(response.data);
        setMovies(moviesData);
      } catch (err) {
        console.log(err);
      }
    };
    getMovies();
  }, []);

  return (
    <div className='container-fluid card-grid'>
      <div className='rows cards'>
        <div className='col card-items'>
          <div className='card-grid-container'>
            {movies.slice(0, 20).map((movie) => (
              <NavLink to={`movie/${movie.id}`} className='movie-links'>
                <div className='card-grid-item'>
                  <Card
                    // title={movie.title}
                    // genres={movie.genres}
                    // releasedDate={movie.released}
                    // imgUrl={movie.poster}
                    id={movie.id}
                    title={movie.title}
                    genres={movie.genres}
                    imgUrl={movie.image}
                    key={movie.id}
                  />
                </div>
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardGrid;
