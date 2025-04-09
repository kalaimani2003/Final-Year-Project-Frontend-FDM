import React, { useEffect, useState } from "react";
import axios from "axios";
import "./dashboard.css";
import Drawer from "./Drawer";

function Dashboard() {
  const [userCount, setUserCount] = useState(0);
  const [vegCount, setVegCount] = useState(0);
  const [nonVegCount, setNonVegCount] = useState(0);
  const [loading, setLoading] = useState(true);  // To manage loading state
  const [error, setError] = useState(null); // To store any errors

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const response = await axios.get(
          "http://localhost/Fooddeliver/FoodDeliver/controllers/api/user/get/getUsercount.php"
        );
        // console.log("API Response:", response.data); // Debugging response

        // Check if the response has the expected data structure
        if (response.data && response.data.userCount !== undefined) {
          const { userCount, vegCount, nonVegCount } = response.data;

          setUserCount(userCount || 0);
          setVegCount(vegCount || 0);
          setNonVegCount(nonVegCount || 0);
        } else {
          setError("Invalid data format received");
        }
      } catch (error) {
        // console.error("Error fetching counts:", error);
        setError("Failed to fetch data");
      } finally {
        setLoading(false); // Set loading to false once the data is fetched or error occurs
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="db-main">
      <Drawer />
      <main className="main-content">
        <div className="container">
          <section className="summary-cards">
            {loading ? (
              <div>Loading...</div>  // Show loading text while data is being fetched
            ) : error ? (
              <div>{error}</div>  // Show error message if something goes wrong
            ) : (
              <>
                <div className="card">
                  <h2>User Count</h2>
                  <p>{userCount}</p> {/* Display the user count dynamically */}
                </div>

                <div className="card">
                  <h3>Non-veg Count</h3>
                  <p>{nonVegCount}</p> {/* Display the non-veg count dynamically */}
                </div>

                <div className="card">
                  <h3>Veg Count</h3>
                  <p>{vegCount}</p> {/* Display the veg count dynamically */}
                </div>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
