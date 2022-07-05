import React from 'react';
import { NavLink } from 'react-router-dom';
import '../assets/stylesheets/Footer.css';

const Footer = () => {
  return (
    <div>
      <div className='container-fluid footer-main'>
        {/* <!-- Footer --> */}
        <footer className='footer text-center text-white '>
          {/* <!-- Grid container --> */}
          <div className='container'>
            {/* <!-- Section: Links --> */}
            <section className='mt-5'>
              {/* <!-- Grid row--> */}
              <div className='row text-center d-flex justify-content-center pt-5'>
                {/* <!-- Grid column --> */}
                <div className='col-md-2'>
                  <h6 className='text-uppercase font-weight-bold'>
                    <NavLink className='footer-links' to='/'>
                      Home
                    </NavLink>
                  </h6>
                </div>
                {/* <!-- Grid column --> */}

                {/* <!-- Grid column --> */}
                <div className='col-md-2'>
                  <h6 className='text-uppercase font-weight-bold'>
                    <NavLink className='footer-links' to='/search-movie'>
                      Search Movies
                    </NavLink>
                  </h6>
                </div>
                {/* <!-- Grid column --> */}

                {/* <!-- Grid column --> */}
                {/* <div className='col-md-2'>
                  <h6 className='text-uppercase font-weight-bold'>
                    <NavLink className='footer-links' to='/about'>
                      About
                    </NavLink>
                  </h6>
                </div> */}
                {/* <!-- Grid column --> */}
              </div>
              {/* <!-- Grid row--> */}
            </section>
            {/* <!-- Section: Links --> */}

            <hr className='my-5' color='white' />

            {/* <!-- Section: Text --> */}
            <section className='mb-5'>
              <div className='row d-flex justify-content-center'>
                <div className='col-lg-8'>
                  <p>
                    MovieFlex is the best website to book the movie tickets in
                    your nearby theatres without any hassle you can select the
                    available movie screening time and it also allows to select
                    the best available seats. This movie booking website allows 
                    users to book their favorite movies, tv shows, and web series 
                    from multiple genres like Crime, Comedy, Drama, Documentaries, 
                    Horror, Anime, Romance, War, Action, Fantasy, Kids and many more!
                  </p>
                </div>
              </div>
            </section>
            {/* <!-- Section: Text --> */}

            {/* <!-- Section: Social --> */}
            <section className='text-center mb-5'>
              <a href='' className='text-white mx-4'>
                <i className='fa-brands fa-facebook-f'></i>
              </a>
              <a href='' className='text-white mx-4'>
                <i className='fab fa-twitter'></i>
              </a>
              <a href='' className='text-white mx-4'>
                <i className='fab fa-google'></i>
              </a>
              <a href='' className='text-white mx-4'>
                <i className='fab fa-instagram'></i>
              </a>
              <a href='' className='text-white mx-4'>
                <i className='fab fa-linkedin'></i>
              </a>
              <a href='' className='text-white mx-4'>
                <i className='fab fa-github'></i>
              </a>
            </section>
            {/* <!-- Section: Social --> */}
          </div>
          {/* <!-- Grid container --> */}

          {/* <!-- Copyright --> */}
          <div
            className='text-center p-3 copyright-footer'
            // style=""
          >
            © 2022 Copyright:
            <a className='footer-links' href=''>
              Company Name
            </a>
          </div>
          {/* <!-- Copyright --> */}
        </footer>
        {/* <!-- Footer --> */}
      </div>
    </div>
  );
};

export default Footer;
