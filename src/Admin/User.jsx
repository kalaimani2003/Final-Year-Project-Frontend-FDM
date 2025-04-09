import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './user.css';

function User() {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState(101); // Example user ID (can be dynamic)

  // Fetch data from the backend API when the component mounts
  useEffect(() => {
    fetchUsers();
  }, [userId]);

  // Fetch users
  const fetchUsers = () => {
    axios.post('http://localhost/Fooddeliver/Fooddeliver/controllers/api/user/get/get.php', { id: userId })
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        // console.error('Error fetching data:', error);
      });
  };

  // Delete user
  const deleteUser = (username) => {
    axios.post('http://localhost/Fooddeliver/Fooddeliver/controllers/api/user/delete/delete.php', { username })
      .then(response => {
        alert(response.data.message); // Show success message
        fetchUsers(); // Refresh user list
      })
      .catch(error => {
        // console.error('Error deleting user:', error);
        alert('Failed to delete user');
      });
  };

  return (
    <>
      <div className="ud">
        <div className="containeruser">
          <table className="users-table">
            <thead>
              <tr className="table-row">
                <th className="table-header">Username</th>
                <th className="table-header">Email</th>
                <th className="table-header">Address</th>
                <th className="table-header">Contact</th>
                <th className="table-header">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map((user, index) => (
                  <tr className="table-row" key={index}>
                    <td className="table-cell">{user.Username}</td>
                    <td className="table-cell">{user.Email}</td>
                    <td className="table-cell">{user.Address}</td>
                    <td className="table-cell">{user.Contact}</td>
                    <td className="table-cell">
                      <button
                        className="delete-btn"
                        title="Delete user"
                        onClick={() => deleteUser(user.Username)}
                      >
                        <svg
                          className="delete-icon"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="table-cell">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default User;
