import React, { useState } from 'react';
import './admin.css';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [submit, setSubmit] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [adminPassword, setAdminPassword] = useState('123'); // Default admin password
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Handle login validation
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === adminPassword) {
      navigate('/dash'); // Redirect to dashboard if successful
    } else {
      setError('Invalid username or password');
    }
  };

  // Handle the forgot password scenario
  const handleForgotPassword = (e) => {
    e.preventDefault();
    setSubmit(true);
  };

  // Handle password reset
  const handleResetPassword = (e) => {
    e.preventDefault();
    if (newPassword === confirmPassword) {
      setAdminPassword(newPassword); // Update admin password
      setSubmit(false); // Switch back to login page
      setError(''); // Clear any previous errors
      alert('Password reset successful. Please log in with your new password.');
    } else {
      setError('Passwords do not match');
    }
  };

  return (
    <>
      <div className="admin-div">
        {submit ? (
          // Reset Password Form
          <div className="login-container">
            <h1 className="login-title">Reset Password</h1>
            <form className="login-form" onSubmit={handleResetPassword}>
              <div className="form-group">
                <label className="ll" htmlFor="new-password">New Password</label>
                <input
                  type="password"
                  id="new-password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
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
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="login-button1">Reset Password</button>
            </form>
          </div>
        ) : (
          // Admin Login Form
          <div className="login-container">
            <h1 className="login-title">Admin Login</h1>
            <form className="login-form" onSubmit={handleLogin}>
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
              {error && <p className="error-message">{error}</p>}
              <button type="submit" className="login-button1">Login</button>
            </form>
            <div className="forgot-password">
              <a href="#" id="forgot-password-link" onClick={handleForgotPassword}>
                Forgot Password?
              </a>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default AdminLogin;
