/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/

import React, { useState, useEffect } from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from 'react-google-maps';

function Map() {
  const [search, setSearch] = useState('');
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    // Fetch restaurant data based on search term
  }, [search]);

  return (
    <>
      <input type="text" value={search} onChange={e => setSearch(e.target.value)} />
      <GoogleMap
        defaultZoom={10}
        defaultCenter={{ lat: 45.5231, lng: -73.567 }}
      >
        {/* Display markers for each restaurant */}
        {restaurants.map(restaurant => (
          <Marker key={restaurant.id} position={{ lat: restaurant.latitude, lng: restaurant.longitude }} />
        ))}
      </GoogleMap>
    </>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function App() {
  return (
    <div>
      <WrappedMap
        googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=YOUR_API_KEY`}
        loadingElement={<div style={{ height: '100%' }} />}
        containerElement={<div style={{ height: '400px' }} />}
        mapElement={<div style={{ height: '100%' }} />}
      />
    </div>
  );
}

export default App;
