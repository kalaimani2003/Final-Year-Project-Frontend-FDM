import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './editfoodd.css';

const Editfoodd = () => {
  const { id } = useParams();
  const [foodDetails, setFoodDetails] = useState({
    name: '',
    price: '',
    description: '',
    image: null,  // Initially, we don't have the image
  });
  const [message, setMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost/Fooddeliver/Fooddeliver/controllers/api/admin/get/ViewStage.php?id=${id}`
        );
        const { FoodName, Price, Description, Image } = response.data;

        const imageUrl = Image ? Image : null;

        setFoodDetails({
          name: FoodName,
          price: Price,
          description: Description,
          image: imageUrl,  // Set the image URL here
        });
      } catch (error) {
        console.error('Error fetching food details:', error);
      }
    };

    if (id) fetchFoodDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFoodDetails({ ...foodDetails, [name]: value });
  };

  const handleFileChange = (e) => {
    setFoodDetails({ ...foodDetails, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('FoodName', foodDetails.name);
    formData.append('Price', foodDetails.price);
    formData.append('Description', foodDetails.description);
    if (foodDetails.image) formData.append('Image', foodDetails.image);

    try {
      const response = await axios.post(
        `http://localhost/Fooddeliver/Fooddeliver/controllers/api/admin/get/ViewStage.php?id=${id}`,
        formData,
        { headers: { 'Content-Type': 'multipart/form-data' } }
      );
      setMessage(response.data.message || 'Food item updated successfully!');
      setShowModal(true);
    } catch (error) {
      setMessage(error.response?.data?.error || 'Failed to update food item.');
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMessage('');
  };

  return (
    <>
      <div className="bodyy">
        <div className="containerr">
          <h1 className="hh">Edit Food Item</h1>
          <form className="frm" onSubmit={handleSubmit}>
            <div className="form-groupp">
              <label className="lb" htmlFor="name">Food Name</label>
              <input
                className="inpu"
                type="text"
                id="name"
                name="name"
                value={foodDetails.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-groupp">
              <label className="lb" htmlFor="price">Price</label>
              <input
                className="inpu"
                type="number"
                id="price"
                name="price"
                value={foodDetails.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
              />
            </div>
            <div className="form-group full-width">
              <label className="lb" htmlFor="description">Description</label>
              <textarea
                className="tx"
                id="description"
                name="description"
                value={foodDetails.description}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-groupp">
              <label htmlFor="image">Image:</label><br />
              {foodDetails.image && <img src={foodDetails.image} alt="Food" />}
              <input
                className="inpp"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
            <div className="form-group full-width">
              <button className="butn" type="submit">Update Food Item</button>
            </div>
          </form>
        </div>
      </div>
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
};

export default Editfoodd;
