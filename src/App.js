import './App.css';
import Home from './Components/Home/Home';
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
} from 'react-router-dom';
import Checkout from './Components/Checkout/Checkout';
import Login from './Components/Login/Login';
import { useEffect } from 'react';
import { auth } from './firebase';
import { useStateValue } from './Stateprovider';
import Payment from './Components/Payment/Payment';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const promise = loadStripe(
  'pk_test_51Lz157CU2gAQLhKIfmfhXKsR7gH4HTO3GaYkZnAy6UVhPykszrYqbjq5JSKHP5o260LibdNJCAR7wj6ZJpu6WOyP00scOWZT2r'
);

function App() {
  const [{}, dispatch] = useStateValue();
  //
  useEffect(() => {
    // will only run once when the app component loads....
    auth.onAuthStateChanged((authUser) => {
      console.log('The User is >>>', authUser);

      if (authUser) {
        //the user just logged in / the user was logged in
        dispatch({
          type: 'SET_USER',
          user: authUser,
        });
      } else {
        // the user is loggedOut
        dispatch({
          type: 'SET_USER',
          user: null,
        });
      }
    });
  }, []);
  return (
    //BEM
    <Router>
      <div className='app'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route
            path='/payment'
            element={
              <Elements stripe={promise}>
                <Payment />
              </Elements>
            }
          />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
