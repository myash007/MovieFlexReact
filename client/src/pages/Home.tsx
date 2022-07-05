import React, { useContext } from 'react';
import '../assets/stylesheets/Homepage.css';
import CardGrid from '../components/CardGrid';

type HomeProps = {};

const Home = (props: HomeProps) => {
  return (
    <div className='container-fluid main-homepage'>
      <div className='row home-title'>
        <h1 className='page-title ml-4 mt-4'>New Releases</h1>
      </div>
      <div className='row new-released'>
        <CardGrid />
      </div>
    </div>
  );
};

export default Home;
