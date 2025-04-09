import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import "./admin.css";

function Register() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmpassword: '',
    address: '',
    contact: ''
  });

  const navigate = useNavigate(); // Initialize the useNavigate hook

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if password and confirm password match
    if (formData.password !== formData.confirmpassword) {
      alert('Password and Confirm Password do not match');
      return;
    }

    const dataToSend = {
      Username: formData.username,  // Use "Username" instead of "username"
      Email: formData.email,        // Use "Email" instead of "email"
      Password: formData.password,  // Use "Password" instead of "password"
      Confirmpassword: formData.confirmpassword,  // Use "Confirmpassword" instead of "confirmpassword"
      Address: formData.address,    // Use "Address" instead of "address"
      Contact: formData.contact     // Use "Contact" instead of "contact"
    };

    try {
      const response = await axios.post('http://localhost/Fooddeliver/Fooddeliver/controllers/api/user/post/post.php', dataToSend);
      
      if (response.data.message) {
        alert('User registered successfully!');
        
        // Clear the form data
        setFormData({
          username: '',
          email: '',
          password: '',
          confirmpassword: '',
          address: '',
          contact: ''
        });

        // Redirect to login page after successful registration
        navigate('/user'); // Adjust the path to your login page
      }
    } catch (error) {
      // console.error('There was an error!', error);
      alert('Error during registration');
    }
  };

  return (
    <div className="admin-div">
      <div className="login-container">
        <h1 className="login-title">New Register</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className='ll' htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='ll' htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='ll' htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='ll' htmlFor="confirmpassword">Confirm Password</label>
            <input
              type="password"
              id="confirmpassword"
              name="confirmpassword"
              value={formData.confirmpassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='ll' htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label className='ll' htmlFor="contact">Contact</label>
            <input
              type="text"
              id="contact"
              name="contact"
              value={formData.contact}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button1">Register</button>
        </form>
      </div>
    </div>
  );
}

export default Register;
