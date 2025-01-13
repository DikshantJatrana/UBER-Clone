# Uber Clone Frontend Documentation

## Overview

This project is a frontend implementation of an Uber clone application. It uses React for building the user interface and Leaflet for map integration.

## Project Structure

```
frontend/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── Components/
│   │   ├── LiveTracking.jsx
│   │   └── ...
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── ...
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/uber-clone.git
cd uber-clone/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the `frontend` directory and add your environment variables:

```
REACT_APP_API_URL=http://localhost:5000
```

## Running the Application

To start the development server, run:

```bash
npm start
```

The application will be available at `http://localhost:3000`.

## Components

### LiveTracking

**File:** `src/Components/LiveTracking.jsx`

This component displays a live map and tracks the user's location in real-time.

**Key Features:**

- Uses Leaflet for map rendering.
- Tracks the user's location using the Geolocation API.
- Updates the map center and marker position as the user's location changes.

**Code Example:**

```jsx
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix for default marker icon issue in Leaflet
import markerIconPng from "leaflet/dist/images/marker-icon.png";
import markerShadowPng from "leaflet/dist/images/marker-shadow.png";

const markerIcon = new L.Icon({
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: -3.745,
  lng: -38.523,
};

// Component to dynamically update the map center
const RecenterMap = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center, map.getZoom());
  }, [center, map]);
  return null;
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(center);

  useEffect(() => {
    // Get the initial position
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    // Watch position changes
    const watchId = navigator.geolocation.watchPosition((position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({ lat: latitude, lng: longitude });
    });

    // Cleanup watcher on component unmount
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  return (
    <MapContainer center={currentPosition} zoom={15} style={containerStyle}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <RecenterMap center={currentPosition} />
      <Marker position={currentPosition} icon={markerIcon} />
    </MapContainer>
  );
};

export default LiveTracking;
```

## Environment Variables

- `REACT_APP_API_URL`: The base URL for the backend API.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm test`

Launches the test runner in the interactive watch mode.

### `npm run build`

Builds the app for production to the `build` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

## Dependencies

- React
- React Leaflet
- Leaflet

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.
