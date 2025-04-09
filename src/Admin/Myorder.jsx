import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './myorder.css';

function Myorder() {
  const [orders, setOrders] = useState([]);
  const [username, setUsername] = useState('');

  // Fetch the logged-in username from localStorage
  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
      fetchOrders(storedUsername);
    }
  }, []);

  // Fetch orders based on the username
  const fetchOrders = async (username) => {
    try {
      const response = await axios.get(
        `http://localhost/Fooddeliver/Fooddeliver/controllers/api/user/post/GetOrders.php?username=${username}`
      );
      setOrders(response.data.orders || []);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      alert('Failed to fetch orders. Please try again later.');
    }
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
      <div className="dy">
        <div className="cntainer">
          <h1 className="m">My Orders</h1>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <tr key={index}>
                    <td data-label="Order ID">{order.id}</td>
                    <td data-label="Date">{order.date}</td>
                    <td data-label="Items">{order.orderNames}</td>
                    <td data-label="Total">₹{order.totalAmount}</td>
                    <td data-label="Status">
                      <span
                        className={`status status-${
                          order.status.toLowerCase()
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center' }}>
                    No orders found for {username}.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Myorder;
