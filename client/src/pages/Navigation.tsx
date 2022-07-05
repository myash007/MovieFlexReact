import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../assets/stylesheets/Navigation.css';
import {
  AuthContext,
  UserContext,
  AuthContextType,
  UserContextType,
} from '../context/AuthContext';

type NavProps = {};

const Navigation = (props: NavProps) => {
  const auth = useContext(AuthContext) as AuthContextType;
  const user = useContext(UserContext) as UserContextType;
  const navigate = useNavigate();

  const logout = () => {
    auth.logout();
    navigate('/');
    user.setData(null);
    localStorage.removeItem('loginToken');
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark '>
      <a className='navbar-brand' href='/'>
        MovieFlex
      </a>
      <button
        className='navbar-toggler'
        type='button'
        data-toggle='collapse'
        data-target='#navbarNavDropdown'
        aria-controls='navbarNavDropdown'
        aria-expanded='false'
        aria-label='Toggle navigation'
      >
        <span className='navbar-toggler-icon navbar-dark'></span>
      </button>
      <div className='collapse navbar-collapse main-nav' id='navbarNavDropdown'>
        {auth.isLoggedIn == false ? (
          <ul className='main-nav navbar-nav'>
            <li className='nav-item'>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/search-movie'>Search Movies</NavLink>
            </li>
          </ul>
        ) : (
          <ul className='main-nav navbar-nav'>
            <li className='nav-item'>
              <NavLink to='/'>Home</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/search-movie'>Search Movies</NavLink>
            </li>
            <li className='nav-item'>
              <NavLink to='/myorders'>My Orders</NavLink>
            </li>
          </ul>
        )}
        {auth.isLoggedIn == false ? (
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item nav-user-btn'>
              <NavLink to='/login'>
                <button className='btn btn-outline-success px-2 py-0'>
                  Login
                </button>
              </NavLink>
            </li>
            <li className='nav-item nav-user-btn'>
              <NavLink to='/register'>
                <button className='btn btn-outline-success px-2 py-0'>
                  Register
                </button>
              </NavLink>
            </li>
          </ul>
        ) : (
          <ul className='navbar-nav ml-auto'>
            <li className='nav-item userName'>
              Hello,
              {' ' + user.username.toUpperCase()}
            </li>
            <li className='nav-item nav-user-btn'>
              <NavLink to='/'>
                <button
                  className='btn btn-outline-danger px-2 py-0'
                  onClick={logout}
                >
                  LogOut
                </button>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
