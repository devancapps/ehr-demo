# EHR Demo Server

This is the backend server for the EHR (Electronic Health Record) Demo application. It provides API endpoints for user authentication and patient management.

## Prerequisites

- Node.js (v14 or higher)
- PostgreSQL

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/your-username/ehr-demo.git
   cd ehr-demo/server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root of the server directory and add the following environment variables:
   ```
   PORT=5000
   DB_USER=your_db_user
   DB_HOST=localhost
   DB_NAME=ehr_demo
   DB_PASSWORD=your_db_password
   DB_PORT=5432
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```
   Replace the placeholders with your actual database credentials and choose a strong JWT secret.

4. Initialize the database:
   ```
   psql -U your_db_user -d your_db_name -f database/init.sql
   ```

## Running the Server

To start the server in development mode:

```
npm run dev
```

To start the server in production mode:

```
npm start
```

The server will start on the port specified in your `.env` file (default is 5000).

## API Endpoints

### Authentication
- POST `/api/auth/register` - Register a new user
- POST `/api/auth/login` - Login and receive JWT token

### Patients
- GET `/api/patients` - Get all patients
- GET `/api/patients/:id` - Get a specific patient
- POST `/api/patients` - Create a new patient
- PUT `/api/patients/:id` - Update a patient
- DELETE `/api/patients/:id` - Delete a patient

All patient routes require authentication.

## Testing

To run tests:

```
npm test
```

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.