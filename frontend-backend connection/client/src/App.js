import React, { useState, useEffect } from 'react';

function App() {
  const [userDetails, setUserDetails] = useState([]);

  useEffect(() => {
    // Fetch data from the backend
    fetch('/api/users-data')
      .then((response) => response.json()) // Parse JSON data from the response
      .then((data) => {
        setUserDetails(data); // Set the data to state
      })
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  return (
    <div>
      <h1>Connecting Reactjs to Nodejs:</h1>
      <ul>
        {userDetails.map((item) => (
          <li key={item.id}>
            <strong>Title:</strong> {item.title}
            <br />
            <strong>Body:</strong> {item.body}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
