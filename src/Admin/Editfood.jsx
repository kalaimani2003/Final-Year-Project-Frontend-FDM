import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './editfood.css';

function Editfood() {
  const [foodItems, setFoodItems] = useState([]);

  useEffect(() => {
    const fetchFoodItems = async () => {
      try {
        const response = await axios.get(
          'http://localhost/Fooddeliver/Fooddeliver/controllers/api/admin/get/A_ViewStage.php'
        );
        setFoodItems(response.data);
      } catch (error) {
        console.error('Error fetching food items:', error);
      }
    };

    fetchFoodItems();
  }, []);

  return (
    <div className="whole">
      <div className="card-container">
        {foodItems.length > 0 ? (
          foodItems.map((food) => (
            <div className="card" key={food.id}>
              <img
                src={food.Image || '/placeholder.png'} // Fallback if no image
                alt={food.Description}
                onError={(e) => {
                  e.target.src = '/placeholder.png'; // Fallback image
                }}
              />
              <p>{food.Description}</p>
              <Link to={`/edit/${food.id}`}>
                <button className="edit-button">
                  Edit <FaEdit />
                </button>
              </Link>
            </div>
          ))
        ) : (
          <p>No food items available</p>
        )}
      </div>
    </div>
  );
}

export default Editfood;
