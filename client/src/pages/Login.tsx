import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import '../assets/stylesheets/Login.css';
import { Form, Button } from 'react-bootstrap';
import { AuthContext, UserContext, AuthContextType, UserContextType } from '../context/AuthContext';
import signinIllustrator from '../assets/images/movie-watching.gif';
import axios from 'axios';
import decode from 'jwt-decode';

const Login = () => {
  const auth = useContext(AuthContext) as AuthContextType;
  const user = useContext(UserContext) as UserContextType;
  //Check if user is already loggedin or not

  // useEffect(() => {
  //   const getLogin = async () => {
  //     const response = await axios.get('http://localhost:4000/login');
  //   };
  //   getLogin();
  // });
  const [loginForm, setLoginForm] = useState({
    userEmail: '',
    userPassword: '',
  });
  const navigate = useNavigate();

  const updateLoginForm = (value: object) => {
    return setLoginForm((prev) => {
      return { ...prev, ...value };
    });
  };

  const handleLoginFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // console.log({ registerForm });

    //by default it will submit the form, so prevent it using preventDefault method
    e.preventDefault();
    const loginUser = { ...loginForm };
    try {
      const response = await axios.post(
        'http://localhost:4000/login',
        JSON.stringify(loginUser),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.data.isLoggedIn == true) {
        auth.login();
        var data: any = decode(response.data.token);
        user.setData(data);
        localStorage.setItem('loginToken', response.data.token);
        if (data.role == "admin") {
          navigate('/admin');
        } else {
          navigate('/');
        }

      } else {
        alert(response.data.msg);
      }
    } catch (err) {
      console.log(err);
    }
    setLoginForm({
      userEmail: '',
      userPassword: '',
    });
  };

  return (
    <div className='container-fluid login'>
      <div className='row login-row'>
        <div className='col-lg-6 login-image-container'>
          <img
            src={signinIllustrator}
            alt='Img not found'
            className='login-img'
            draggable='false'
          />
        </div>
        <div className='col-lg-6 login-form'>
          <h2>Login</h2>
          <hr />
          <Form onSubmit={handleLoginFormSubmit}>
            <Form.Group className='mb-3' controlId='userEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type='email'
                placeholder='Enter email'
                value={loginForm.userEmail}
                onChange={(e) => updateLoginForm({ userEmail: e.target.value })}
              />
              <Form.Text className='text-muted'>
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group className='mb-3' controlId='userPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type='password'
                placeholder='Password'
                autoComplete='true'
                value={loginForm.userPassword}
                onChange={(e) =>
                  updateLoginForm({ userPassword: e.target.value })
                }
              />
            </Form.Group>

            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
