import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import CurrencyFormat from 'react-currency-format';
import { Link, useNavigate } from 'react-router-dom';
import { getBasketTotal } from '../../reducer';
import { useStateValue } from '../../Stateprovider';
import CheckoutProduct from '../Checkout/CheckoutProduct/CheckoutProduct';
import axios from 'axios';
import Header from '../Header/Header';
import './Payment.css';
const Payment = () => {
  const navigate = useNavigate();
  const [{ basket, user }, dispatch] = useStateValue();

  const stripe = useStripe;
  const elements = useElements;

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);

  const [processing, setProcessing] = useState(false);
  const [succeeded, setSucceeded] = useState('');
  const [clientSecret, setClientSecret] = useState(true);

  useEffect(() => {
    // generate the special stripe secret which allows us to charge a customer
    const getClientSecret = async () => {
      const response = await axios({
        method: 'post ',
        //strip expects the total in a currencies subunits
        url: `/payment/create?total=${getBasketTotal(basket) * 100}`,
      });
      setClientSecret(response.data.clientSecret);
    };

    getClientSecret();
  }, [basket]);

  const handleSubmit = async (event) => {
    // do all the fancy strip stuff ........
    event.preventDefault();
    setProcessing(true);

    const payload = await stripe
      .confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      })
      .then(({ paymentIntent }) => {
        //paymentintent = paymentconfirmention
        setSucceeded(true);
        setError(null);
        setProcessing(false);

        navigate('/orders', { replace: true });
      });
  };

  const handleChange = (event) => {
    //Listen for change in the CardElement
    //and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : '');
  };
  return (
    <div>
      <Header />
      <div className='payment'>
        <div className='payment__container'>
          <h1>
            Checkout (<Link to='/checkout'>{basket?.length} items</Link>)
          </h1>

          {/* Payment section - delivery address */}
          <div className='payment__section'>
            <div className='payment__title'>
              <h3>Delivery Address</h3>
            </div>
            <div className='payment__address'>
              <p>{user?.email}</p>
              <p>123 React lane</p>
              <p>Los Angeles,CA</p>
            </div>
          </div>

          {/* Payment section - Review Items */}
          <div className='payment__section'>
            <div className='payment__title'>
              <h3>Review Item and Delivery</h3>
            </div>

            <div className='payment__items'>
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  image={item.image}
                  price={item.price}
                  rating={item.rating}
                />
              ))}
            </div>
          </div>

          {/* Payment section - Payment method */}
          <div className='payment__section'>
            <div className='payment__title'>
              <h3>Payment Method</h3>
            </div>

            <div className='payment__details'>
              {/* stirp magic will go */}
              <form action='' onSubmit={handleSubmit}>
                <CardElement onChange={handleChange} />

                <div className='payment__priceContainer'>
                  <CurrencyFormat
                    renderText={(value) => <h3>Order Total : {value}</h3>}
                    decimalScale={2}
                    value={getBasketTotal(basket)} // Part of the homework
                    displayType={'text'}
                    thousandSeparator={true}
                    prefix={'$'}
                  />
                  <button disabled={processing || disabled || succeeded}>
                    <span>{processing ? <p>Processing</p> : 'Buy Now'}</span>
                  </button>
                </div>
                {/* erros */}
                {error && <div>{error}</div>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
