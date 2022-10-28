import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../../firebase';
import './Login.css';
const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const signIn = (e) => {
    e.preventDefault();
    //some fancy firebase login

    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        if (auth) {
          navigate('/', { replace: true });
        }
      })

      .catch((error) => alert(error.message));
  };
  const register = (e) => {
    e.preventDefault();
    //
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        // it succesfully created a new user with email and password
        if (auth) {
          navigate('/', { replace: true });
        }
        console.log(auth);
      })
      .catch((error) => alert(error.message));
  };
  return (
    <div className='login'>
      <Link to='/'>
        <img
          className='login__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt=''
        />
      </Link>
      <div className='login__container'>
        <h1>Sign in</h1>
        <form action=''>
          <h5>E-mail</h5>
          <input
            type='text'
            name=''
            id=''
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type='password'
            name=''
            id=''
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type='submit'
            onClick={signIn}
            className='login__signInButton'
          >
            Sign in
          </button>
        </form>
        <p>
          By signing in you agree to Amazon's FAKE COLONE conditions of use &
          sale.Please see our policy Notice,our Cookies Notice and Our Interest
          Based Ads Notice
        </p>
        <button onClick={register} className='login__registerButton'>
          Create Your Amazon Account
        </button>
      </div>
    </div>
  );
};

export default Login;
