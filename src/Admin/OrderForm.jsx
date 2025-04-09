import React, { useState } from 'react';
import { useLocation, useNavigate,Link } from 'react-router-dom';
import './orderform.css';

function OrderForm() {
  const { state } = useLocation();
  const { foodName = '', price = 0 } = state || {};

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(price);
  const navigate = useNavigate();

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || 0;
    setQuantity(newQuantity);
    setTotal(newQuantity * price);
  };

  const order = (e) => {
    e.preventDefault();

    const orderData = {
      orderName: foodName,
      price: price,
      quantity: quantity,
      total: total,
    };

    // Get existing orders from localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];

    // Add new order to the list
    existingOrders.push(orderData);

    // Save updated orders list to localStorage
    localStorage.setItem('orders', JSON.stringify(existingOrders));

    // Show success alert and navigate to OrderList
    window.alert('Order successfully placed');
    navigate('/order-list');
  };

  return (
    <>
    <div className="wrap-body">
        <nav className="navbar-user">
          <div className="navbar-container">
            <div className="logo">DELICIOUS FOOD</div>
            <ul className="nav-links1">
              <Link to="/userpanel"><li><a href="">Home</a></li></Link>
              <Link to="/my"><li><a href="">My Orders</a></li></Link>
              <Link to="/order-list"><li><a href="">View Cart</a></li></Link>
              <Link to="/user"><li><a href="">Logout</a></li></Link>
            </ul>
          </div>
        </nav>
        </div>
    <div className="bd">
      <div className="cont">
        <h1 className="hc">Place Your Order</h1>
        <form className="f" onSubmit={order}>
          <div className="form-row">
            <div>
              <label htmlFor="OrderName">Order Name:</label>
              <input type="text" id="ordername" name="ordername" value={foodName} readOnly />
            </div>
            <div>
              <label htmlFor="Price">Price:</label>
              <input type="number" id="price" name="price" value={price} readOnly />
            </div>
            <div>
              <label htmlFor="Quantity">Quantity:</label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                required
              />
            </div>
            <div>
              <label htmlFor="Total">Total:</label>
              <input type="number" id="total" name="total" value={total} readOnly />
            </div>
          </div>

          <button className="bn" type="submit">
            Place Order
          </button>
        </form>
      </div>
    </div>
    </>
  );
}

export default OrderForm;
