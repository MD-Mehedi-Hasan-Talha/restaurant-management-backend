# Restaurant Management System

A scalable backend for restaurant management with features for orders, billing, inventory, and authentication.

## Project Structure

```
restaurant_management/
├── config/             # Application configuration
├── controllers/        # Route controllers
├── models/             # Data models
├── routes/             # API routes
├── index.js            # Application entry point
└── package.json        # Project dependencies
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```

### Running the Application

For development (with auto-restart):
```
npm run dev
```

For production:
```
npm start
```

The server will run on port 3000 by default. You can change this by setting the PORT environment variable.

## API Endpoints

- `GET /`: Welcome message

## Future Enhancements

- User authentication
- Order management
- Billing system
- Inventory tracking
- Reporting and analytics
