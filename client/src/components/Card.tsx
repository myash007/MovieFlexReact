import React from 'react';
import '../assets/stylesheets/Card.css';

type CardProps = {
  // title: string;
  // genres: string[];
  // releasedDate: string;
  // imgUrl: string;

  id: string;
  title: string;
  genres: string;
  imgUrl: string;
};

const Card = (props: CardProps) => {
  var allGenres: string[] = [];
  if (props.genres != null) {
    allGenres = props.genres.split(',');
  }
  return (
    <div className='container-fluid main-card'>
      <div className='row main-card-row'>
        <img className='movieImg' src={props.imgUrl} alt={props.title} />
        <div className='movieDesc'>
          <div className='movieTitle'>{props.title}</div>
          <div className='genres text-muted'>
            {/* {props.genres.map((genre, index) =>
              props.genres.length - 1 === index ? genre : genre + ' / '
            )} */}

            {allGenres.map((genre, index) =>
              allGenres.length - 1 === index ? genre : genre + ' / '
            )}
          </div>
          {/* <div className='releasedDate'>
            {new Date(props.releasedDate).toDateString()}
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default Card;
