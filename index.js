require('dotenv').config();
const express = require('express');
const cors = require('cors');
const ApiVersions = require('./api');
const sequelizeDB = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: '*',
  })
);

// Add middlewares for parsing JSON and urlencoded data and populating `req.body`
app.use(express.urlencoded({ extended: false }));

// parse requests of content-type - application/json
app.use(express.json());

// base route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Mini Todo App Server' });
});

// API Routes
app.use('/api', ApiVersions);

// Not found route
app.use((req, res) => {
  res.status(404).json({ message: 'API route not found.' });
});

app.listen(PORT, async () => {
  console.log(`Server is running on port ${PORT}`);

  // Connect to Postgres DB
  try {
    await sequelizeDB.sequelize.authenticate();
    console.log('Postgres Database connected');
  } catch (error) {
    console.log(error);
    console.log("Couldn't connect to Postgres DB");
  }
});
