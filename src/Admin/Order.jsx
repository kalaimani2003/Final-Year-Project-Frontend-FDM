import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './order.css';

function Order() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false); // To show a loading indicator
  const [error, setError] = useState(null); // To handle and display errors

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    setLoading(true); // Show loading
    setError(null); // Clear previous errors
    axios
      .get('http://localhost/Fooddeliver/Fooddeliver/controllers/api/user/post/order.php')
      .then(response => {
        setOrders(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("There was an error fetching the orders!", err);
        setError("Failed to fetch orders. Please try again.");
        setLoading(false);
      });
  };

  const handleCompletedChange = (orderId, isChecked) => {
    const newStatus = isChecked ? 'Completed' : 'Processing';
    console.log(`Setting status for Order ID ${orderId} to ${newStatus}`);
    setLoading(true);

    axios
      .post('http://localhost/Fooddeliver/Fooddeliver/controllers/api/user/post/updateOrderStatus.php',
        { orderId, status: newStatus })
      .then(response => {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        setLoading(false);
      })
      .catch(err => {
        console.error("Error updating status:", err);
        setError("Failed to update status. Please try again.");
        setLoading(false);
      });
  };  

  return (
    <div className="whole-wrap">
      <div className="wrap">
        <h1>Food Order Status</h1>

        {/* Error message */}
        {error && <div className="error-message">{error}</div>}

        {/* Loading indicator */}
        {loading && <div className="loading">Loading...</div>}

        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Items Count</th>
              <th>Total</th>
              <th>Status</th>
              <th>Completed</th> {/* New column heading */}
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order, i) => (                
                <tr key={order.id}>
                  <td data-label="Order ID">{order.id}</td>
                  <td data-label="Customer">{order.username}</td>
                  <td data-label="Items">{(order.quantity).split(",")
                    .map((item) => {
                      const [name, qty] = item.split("-");                      
                      return `${name} (${qty})`;
                    })
                    .join(", ")}</td>
                  <td data-label="Items">{((order.items).split(",")).length}</td>
                  <td data-label="Total">{order.totalAmount}</td>
                  <td data-label="Status">
                    <span className={order.status.toLowerCase()}>
                      {order.status}
                    </span>
                  </td>
                  <td data-label="Completed">
                    <input
                      type="checkbox"
                      checked={order.status === 'Completed'}
                      onChange={(e) => handleCompletedChange(order.id, e.target.checked)}
                      style={{ marginLeft: '10px' }}
                      disabled={loading} // Disable during updates
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={{ color: "white" }} colSpan="6">No orders available.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Order;
