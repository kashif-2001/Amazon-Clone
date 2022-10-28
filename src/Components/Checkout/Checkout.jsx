import React from 'react';
import { useStateValue } from '../../Stateprovider';
import Header from '../Header/Header';
import './Checkout.css';
import CheckoutProduct from './CheckoutProduct/CheckoutProduct';
import Subtotal from './Subtotal/Subtotal';
const Checkout = () => {
  const [{ basket }, disptch] = useStateValue();
  return (
    <div>
      <Header />
      <div className='checkout'>
        <div className='checkout__left'>
          <img
            className='checkout__ad'
            src='https://images-na.ssl-images-amazon.com/images/G/02/UK_CCMP/TM/OCC_Amazon1._CB423492668_.jpg'
            alt=''
          />
          <div>
            <h2 className='checkout__title'>Your Shopping Basket</h2>
            <h2>
              {/* reducer tricks */}
              {basket.map((item) => (
                <CheckoutProduct
                  id={item.id}
                  title={item.title}
                  price={item.price}
                  image={item.image}
                  rating={item.rating}
                />
              ))}
            </h2>
          </div>
        </div>
        <div className='checkout__right'>
          <Subtotal />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
