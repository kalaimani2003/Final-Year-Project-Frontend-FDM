import React, { useState } from 'react';
import './admin.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UserLogin() {
  const [submit, setSubmit] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  // Handle login form submission
  // const handleLoginSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   setSuccess('');

  //   // Ensure username and password are not empty
  //   if (!username || !password) {
  //     setError('Username and password are required');
  //     return;
  //   }

  //   try {
  //     // Make POST request to the backend login API
  //     const response = await axios.post(
  //       'http://localhost/Fooddeliver/controllers/api/user/post/UserLogin.php',
  //       {
  //         Username: username,
  //         Password: password,
  //       },
  //       {
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       }
  //     );

  //     // Handle response
  //     if (response.data.message === 'Login successful') {
  //       alert('Login successful!');
  //       navigate('/userpanel'); // Redirect to user panel
  //     } else {
  //       setError(response.data.error || 'Invalid username or password');
  //     }
  //   } catch (error) {
  //     console.error('There was an error!', error);
  //     setError('Error during login');
  //   }
  // };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
  
    // Ensure username and password are not empty
    if (!username || !password) {
      setError('Username and password are required');
      return;
    }
  
    try {
      // Make POST request to the backend login API
      const response = await axios.post(
        'http://localhost/Fooddeliver/Fooddeliver/controllers/api/user/post/UserLogin.php',
        {
          Username: username,
          Password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Handle response
      if (response.data.message === 'Login successful') {
        alert('Login successful!');
        localStorage.setItem('username', username)
        navigate('/userpanel'); // Redirect to user panel
      } else {
        setError(response.data.error || 'Invalid username or password');
      }
    } catch (error) {
      // console.error('There was an error!', error);
      setError('Error during login');
    }
  };
  
  // Handle reset password form submission
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Check if new passwords match
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // Make POST request to reset password API
      const response = await axios.post(
        'http://localhost/Fooddeliver/controllers/api/user/resetPassword.php',
        {
          Username: username,
          NewPassword: newPassword,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true, 
        }
      );

      // Handle response
      if (response.data.message === 'Password reset successful') {
        setSuccess('Password has been reset successfully!');
        setSubmit(false);
      } else {
        setError(response.data.error || 'Failed to reset password');
      }
    } catch (error) {
      console.error('Error resetting password', error);
      setError('Error during password reset');
    }
  };

  // Handle forgot password click
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setSubmit(true); // Switch to reset password form
  };

  return (
    <div className="admin-div">
      {submit ? (
        // Reset Password Form
        <div className="login-container">
          <h1 className="login-title">Reset Password</h1>
          <form className="login-form" onSubmit={handleResetPassword}>
            <div className="form-group">
              <label className="ll" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                placeholder="Enter your username"
              />
            </div>
            <div className="form-group">
              <label className="ll" htmlFor="new-password">New Password</label>
              <input
                type="password"
                id="new-password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
                placeholder="Enter new password"
              />
            </div>
            <div className="form-group">
              <label className="ll" htmlFor="confirm-password">Confirm Password</label>
              <input
                type="password"
                id="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="Confirm new password"
              />
            </div>
            <button type="submit" className="login-button1">Reset Password</button>
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}
          </form>
        </div>
      ) : (
        // User Login Form
        <div className="login-container">
          <h1 className="login-title">User Login</h1>
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="ll" htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="ll" htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="login-button1">Login</button>
            {error && <div className="error-message">{error}</div>}
          </form>
          <div className="forgot-password">
            <a href="#" id="forgot-password-link" onClick={handleForgotPassword}>
              Forgot Password?
            </a>
            <br />
            <Link to="/reg">New register?</Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserLogin;
