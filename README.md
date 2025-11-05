# Mini Todo App Server

A Node.js and Express application for managing todos with a PostgreSQL database.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v14 or higher)
- PostgreSQL (v12 or higher)
- npm or yarn package manager

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Golden-Ogbeka/mini-todo-app-server.git
cd mini-todo-app-server
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Database Setup

- Create a PostgreSQL database named `todo-db`
- Update the database configuration in `config/config.json` if needed:

```json
{
  "development": {
    "username": "postgres",
    "password": "root",
    "database": "todo-db",
    "host": "127.0.0.1",
    "dialect": "postgres"
  }
}
```

- Run database migrations:

```bash
npx sequelize-cli db:migrate
```

### 4. Environment Variables

Create a `.env` file in the root directory:

```env
PORT=3000
NODE_ENV=development
```

## Running the Application

### Development Mode

```bash
npm run dev
# or
yarn dev
```

### Production Mode

```bash
npm start
# or
yarn start
```

The server will start on port `3000` (or the port specified in your `.env` file).

## API Documentation

[Postman Documentation](https://www.postman.com/tfh-documentation/workspace/public-projects/collection/11204995-033ff756-e4ae-4906-9047-47e6c2227661?action=share&creator=11204995)

## Features

- Create, read, update, and delete todos
- Pagination support
- Input validation
- PostgreSQL database integration

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- Sequelize ORM
- Express Validator
- CORS

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the ISC License.

## Author

**Golden Ogbeka**
