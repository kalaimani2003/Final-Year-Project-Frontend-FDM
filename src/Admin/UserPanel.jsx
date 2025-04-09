import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './userpanel.css';

function UserPanel() {
  const [foodItems, setFoodItems] = useState([]);
  const navigate = useNavigate();

  // Function to fetch food items from the API
  const fetchFoodItems = async () => {
    try {
      const response = await axios.get('http://localhost/Fooddeliver/Fooddeliver/controllers/api/user/get/Foodget.php');
      setFoodItems(response.data); // Store the fetched data in state
    } catch (error) {
      console.error('Error fetching food items:', error);
    }
  };

  // Fetch food items when the component mounts
  useEffect(() => {
    fetchFoodItems();
  }, []);

  // Handle Add to Cart
  const handleAddToCart = (item) => {
    navigate('/od', { state: { foodName: item.FoodName, price: item.Price } });
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

        <div className="cardd-container">
          {foodItems.map((item) => {
            return (
              <div className="carddd" key={item.id}>
                <img
                  src={item.Image}  // Directly use the image URL sent by the backend
                  width={300}
                  height={200}
                  alt={item.FoodName}
                />
                <div className="hp">
                  <h2 className="hp">{item.FoodName}</h2>
                  <p className="phh">{item.Description}</p>
                  <p className="ph">Price: ₹ {item.Price}</p>
                  <button className="b" onClick={() => handleAddToCart(item)}>Add to Cart</button>
                </div>
              </div>
            );
          })}
        </div>

        <footer>
          <p className="php">&copy; 2024 User Panel. All rights reserved.</p>
        </footer>
      </div>
    </>
  );
}

export default UserPanel;
