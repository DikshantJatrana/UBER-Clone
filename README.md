# Uber Clone Project

## Overview

This project is an Uber clone application that includes both frontend and backend implementations. The frontend is built using React and Leaflet for map integration, while the backend is built using Node.js and Express.

## Project Structure

```
UBER Clone/
├── Backend/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   └── ...
│   ├── .env
│   ├── package.json
│   ├── README.md
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── Components/
│   │   ├── App.js
│   │   ├── index.js
│   │   └── ...
│   ├── .env
│   ├── package.json
│   ├── README.md
│   └── ...
├── README.md
└── ...
```

## Installation

### Backend

1. Navigate to the backend directory:

```bash
cd UBER Clone/Backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the `Backend` directory and add your environment variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

4. Start the backend server:

```bash
npm start
```

### Frontend

1. Navigate to the frontend directory:

```bash
cd UBER Clone/frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root of the `frontend` directory and add your environment variables:

```
REACT_APP_API_URL=http://localhost:5000
```

4. Start the frontend development server:

```bash
npm start
```

## Running the Application

1. Ensure the backend server is running on `http://localhost:5000`.
2. Ensure the frontend development server is running on `http://localhost:3000`.

## API Documentation

For detailed API documentation, refer to the [Backend README](./Backend/README.md).

## Frontend Documentation

For detailed frontend documentation, refer to the [Frontend README](./frontend/README.md).

## Key Features

- User and Captain Registration and Login
- Real-time location tracking using Leaflet
- JWT-based authentication
- RESTful API for backend services

## Environment Variables

### Backend

- `PORT`: The port on which the backend server runs.
- `MONGO_URI`: The connection string for MongoDB.
- `JWT_SECRET`: The secret key for JWT token generation.

### Frontend

- `REACT_APP_API_URL`: The base URL for the backend API.

## Available Scripts

### Backend

- `npm start`: Starts the backend server.
- `npm run dev`: Starts the backend server in development mode with nodemon.

### Frontend

- `npm start`: Runs the app in the development mode.
- `npm test`: Launches the test runner in the interactive watch mode.
- `npm run build`: Builds the app for production to the `build` folder.

## Dependencies

### Backend

- Express
- Mongoose
- JWT

### Frontend

- React
- React Leaflet
- Leaflet

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any changes.

## License

This project is licensed under the MIT License.

