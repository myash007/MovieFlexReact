import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import '../assets/stylesheets/Register.css';
import { Form, Button } from 'react-bootstrap';
import signupIllustrator from '../assets/images/signup-illustrator.png';
import axios from 'axios';

const Register = () => {
  const [registerForm, setRegisterForm] = useState({
    name: '',
    userEmail: '',
    userPassword: '',
    phoneNumber: '',
  });
  const navigate = useNavigate();

  const updateRegisterForm = (value: object) => {
    return setRegisterForm((prev) => {
      return { ...prev, ...value };
    });
  };

  // const updateRegisterForm = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const targetId = e.target.id;
  //   const targetValue = e.target.value;
  //   const newValue = { targetId: targetValue };
  //   // alert(targetId);
  //   return setRegisterForm((prev) => {
  //     return { ...prev, ...newValue };
  //   });
  // };

  const handleRegisterFormSubmit = async (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    // console.log({ registerForm });

    //by default it will submit the form, so prevent it using preventDefault method
    e.preventDefault();
    const newUser = { ...registerForm };
    try {
      const response = await axios.post(
        'http://localhost:4000/register',
        JSON.stringify(newUser),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert(response.data);
    } catch (err) {
      console.log(err);
    }
    setRegisterForm({
      name: '',
      userEmail: '',
      userPassword: '',
      phoneNumber: '',
    });
    navigate('/login');
  };

  return (
    <div className='container-fluid register'>
      <div className='row register-row'>
        <div className='col-lg-6 register-form'>
          <h2>Register with us</h2>
          <hr />
          <Form onSubmit={handleRegisterFormSubmit}>
            <Form.Group className='mb-3' controlId='name'>
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type='text'
                // id='name'
                placeholder='Enter Username'
                value={registerForm.name}
                onChange={(e) => updateRegisterForm({ name: e.target.value })}
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='userEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                required
                type='email'
                // id='userEmail'
                placeholder='Enter email'
                value={registerForm.userEmail}
                onChange={(e) =>
                  updateRegisterForm({ userEmail: e.target.value })
                }
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
                // id='userPassword'
                placeholder='Password'
                autoComplete='true'
                value={registerForm.userPassword}
                onChange={(e) =>
                  updateRegisterForm({ userPassword: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className='mb-3' controlId='phoneNumber'>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                required
                type='number'
                // id='phoneNumber'
                placeholder='Enter Phone Number'
                value={registerForm.phoneNumber}
                onChange={(e) =>
                  updateRegisterForm({ phoneNumber: e.target.value })
                }
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
        </div>
        <div className='col-lg-6 register-image-container'>
          <img
            src={signupIllustrator}
            alt='Img not found'
            className='signup-img'
            draggable='false'
          />
        </div>
      </div>
    </div>
  );
};

export default Register;
