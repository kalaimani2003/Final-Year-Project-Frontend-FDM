import React, { useEffect, useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import axios from 'axios';
import './OrderList.css';

function OrderList() {
  const [orders, setOrders] = useState([]);
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  // Fetch orders from localStorage and calculate total amount
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(savedOrders);

    const total = savedOrders.reduce((sum, order) => sum + Number(order.total), 0);
    setTotalAmount(total);

    const storedUsername = localStorage.getItem('username') || 'Guest';
    setUsername(storedUsername);
  }, []);

  const handleOrderSubmit = async () => {
    if (address.trim() === '' || phone.trim() === '') {
      alert('Please enter your delivery address and phone number.');
      return;
    }

    const payload = {
      username,
      address,
      phone,
      orderNames: orders.map((order) => order.orderName).join(','),
      orderQuantities: orders.map((order) => `${order.orderName}-${order.quantity}`).join(','),
      totalAmount,
      date: new Date().toISOString().split('T')[0],
    };

    try {
      const response = await axios.post(
        'http://localhost/Fooddeliver/Fooddeliver/controllers/api/user/post/InsertOrder.php',
        payload,
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.data.includes('successfully')) {
        alert(response.data);
        setOrders([]);
        localStorage.removeItem('orders');
      } else {
        alert('Failed to place order');
      }
    } catch (error) {
      console.error('Order submission failed:', error);
      alert('Order submission failed. Please check the console for details.');
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
    
    <div className="whole-wrap">
      <div className="wrap">
        <h2 className="order-greeting">Hi {username}, your orders are:</h2>

        <div className="order-details">
          <input
            type="text"
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        {orders.length === 0 ? (
          <p>No orders placed yet.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>Order Name</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                  <th>Total (₹)</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => (
                  <tr key={index}>
                    <td>{order.orderName}</td>
                    <td>{order.price}</td>
                    <td>{order.quantity}</td>
                    <td>{order.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3>Total Amount: ₹ {totalAmount}</h3>
            <button className="order-submit" onClick={handleOrderSubmit}>
              Submit Order
            </button>
          </>
        )}
      </div>
    </div>
    </>
  );
}

export default OrderList;
