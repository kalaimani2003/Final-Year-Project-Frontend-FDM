import React, { useState } from 'react';
import axios from 'axios';
import './addfood.css';

function Addfood() {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    description: '',
    image: null,
  });

  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData object to handle file uploads
    const data = new FormData();
    data.append('FoodName', formData.name);
    data.append('Price', formData.price);
    data.append('Description', formData.description);
    data.append('image', formData.image);

    try {
      // Make a POST request to your PHP API
      const response = await axios.post(
        'http://localhost/Fooddeliver/Fooddeliver/controllers/api/admin/post/post.php', // Update this URL with your actual endpoint
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // Display success message in a pop-up
      setMessage(response.data.message || 'Food item added successfully!');
      setShowModal(true);
    } catch (error) {
      // Handle errors
      setMessage(error.response?.data?.error || 'Failed to add food item.');
      setShowModal(true);
    }
  };

  // Function to handle modal close and reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: '',
      price: '',
      description: '',
      image: null,
    });
    setMessage('');
  };

  return (
    <>
      <div className="bodyy">
        <div className="containerr">
          <h1 className="hh">Add New Food Item</h1>
          <form className="frm" onSubmit={handleSubmit}>
            <div className="form-groupp">
              <label className="lb" htmlFor="name">Food Name</label>
              <input
                className="inpu"
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                aria-required="true"
              />
            </div>

            <div className="form-groupp">
              <label className="lb" htmlFor="price">Price</label>
              <input
                className="inpu"
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                aria-required="true"
              />
            </div>

            <div className="form-group full-width">
              <label className="lb" htmlFor="description">Description</label>
              <textarea
                className="tx"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
              />
            </div>

            <div className="form-groupp">
              <label htmlFor="image">Image:</label><br />
              <input
                className="inpp"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                required
              />
            </div>

            <div className="form-group full-width">
              <button className="butn" type="submit">Add Food Item</button>
            </div>
          </form>
        </div>
      </div>

      {/* Modal for Success/Error Message */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>{message}</h2>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </>
  );
}

export default Addfood;
