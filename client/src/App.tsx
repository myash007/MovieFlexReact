import React, { useContext, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, useLocation, useParams } from 'react-router-dom';
import Navigation from './pages/Navigation';
import Footer from './pages/Footer';
import Home from './pages/Home';
import Movie from './pages/Movie';
import BookTicket from './pages/BookTicket';
import SearchMovies from './pages/SearchMovies';
import Login from './pages/Login';
import Register from './pages/Register';
import Checkout from './pages/Checkout';
import Profile from './pages/Profile';
import { ProtectedRoute , CheckUserLogInRoute } from './controller/ProtectedRoute';
// import Admin from './pages/admin/Admin';

import Sidebar from "./pages/admin/components/sidebar/Sidebar";
import Topbar from "./pages/admin/components/topbar/Topbar";
import AdminHome from "./pages/admin/pages/home/Home";
import UserList from "./pages/admin/pages/userList/UserList";
import User from "./pages/admin/pages/user/User";
import Ticket from "./pages/admin/pages/tickets/Tickets";
import MovieList from "./pages/admin/pages/movieList/MovieList";
import EditMovie from "./pages/admin/pages/editMovie/EditMovie";
import NewMovie from "./pages/admin/pages/newMovie/NewMovie";
// import { checkAuth } from "./controller/CheckAuth";

import { AuthContext, AuthContextType, UserContextType } from './context/AuthContext';
import { UserContext } from './context/AuthContext';
import decode from 'jwt-decode';
import OrderDetails from './pages/OrderDetails';

type UserType = {
  id: string;
  name: string;
  role: string;
}

type AuthProp = {
  isLoggedIn: boolean;
}

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<UserType>();

  const Menu = () => {
    return (
      <Routes>
        <Route path="admin" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={user?.role!} outlet={<AdminHome />} />} />
        <Route path="/admin/users" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={user?.role!} outlet={<UserList />} />} />
        <Route path="/admin/user/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={user?.role!} outlet={<User />} />} />
        <Route path="/admin/movies" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={user?.role!} outlet={<MovieList />} />} />
        <Route path="/admin/tickets" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={user?.role!} outlet={<Ticket />} />} />
        <Route path="/admin/movies/:id" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={user?.role!} outlet={<EditMovie />} />} />
        <Route path="/admin/newMovie" element={<ProtectedRoute isLoggedIn={isLoggedIn} userRole={user?.role!} outlet={<NewMovie />} />} />
        <Route path="*" element={"Sorry No Page Found"} />
        <Route path='/' element={<Home />} />
        <Route path='movie/:id' element={<Movie />} />
        <Route path='book-ticket/:id' element={<CheckUserLogInRoute isLoggedIn={isLoggedIn} outlet={<BookTicket />} />} />
        <Route path='search-movie' element={<SearchMovies />} />
        <Route path='myorders' element={<CheckUserLogInRoute isLoggedIn={isLoggedIn} outlet={<OrderDetails />} />} />
        <Route path='checkout' element={<CheckUserLogInRoute isLoggedIn={isLoggedIn} outlet={<Checkout />} />} />
        <Route path='login' element={<Login />} />
        <Route path='logout' element={<Home />} />
        <Route path='register' element={<Register />} />
        {/* <Route path="*" element={<h1>Sorry No Page Found</h1>} /> */}
        {/* <Route path='profile' element={<Profile />} /> */}
      </Routes>
    )
  }


  const login = () => {
    setIsLoggedIn(true);
  };
  const logout = () => {
    setIsLoggedIn(false);
  };
  const userData = (userData: any) => {
    setUser(userData);
  }

  if (localStorage.getItem("loginToken") != null && isLoggedIn == false) {
    login();
    var token: any = localStorage.getItem("loginToken");
    var data: any = decode(token);
    userData(data);
  }

  return (
    <AuthContext.Provider
      value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}
    >
      <UserContext.Provider
        value={{ username: user?.name!, userRole: user?.role!, userId: user?.id!, setData: userData }}
      >
        {window.location.pathname.includes("admin") && user?.role != "user" && user?.role != undefined ?
          <div>
            <Topbar />
            <div className="container-admin">
              <Sidebar />
              <Menu />
            </div>
          </div>
          :
          <div className='main-app'>
            <Navigation />
            <Menu />
            <Footer />
          </div>
        }

      </UserContext.Provider>
    </AuthContext.Provider>
  );
};

export default App;
