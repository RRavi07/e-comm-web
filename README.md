
# Project Overview

This project contains a React frontend and an Express backend. The backend is located in the `backend` folder inside the main project directory. To start the project, follow the steps below.

## Prerequisites

Before running the project, make sure to install the necessary Node.js modules in both the main directory and the `backend` folder.

### Steps to Install Dependencies:

1. Navigate to the main project directory and run:
   ```bash
   npm install
   ```
2. Then, navigate to the `backend` folder:
   ```bash
   cd backend
   npm install
   ```

## Running the Project

There are multiple ways to run the project depending on whether you want to start the frontend, backend, or both.

### Starting the Backend Only

To start the backend, navigate to the `backend` folder and run:
```bash
cd backend
node index.js
```

The backend will start on the designated port (check the backend's configuration for the exact port).

### Starting the Frontend Only

To start the React frontend, run the following command from the main project directory:
```bash
npm run start
```

This will start the React app in development mode, and it will be available on [http://localhost:3000](http://localhost:3000).

### Running Both Frontend and Backend Together

You can run both the frontend and backend simultaneously by executing:
```bash
npm run both
```

This command will start the backend first, followed by the frontend, enabling both services to run concurrently.


## Available Scripts

- **`npm start`** – Starts the React frontend in development mode.
- **`cd backend && node index.js`** – Starts the backend server.
- **`npm run both`** – Starts both frontend and backend simultaneously.

## Notes

- Make sure you have both frontend and backend dependencies installed before running the app.
- For backend-related configurations (e.g., ports, database connections), check the files in the `backend` folder.

