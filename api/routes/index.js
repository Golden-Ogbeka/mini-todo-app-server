const express = require('express');
const TodoRoutes = require('./todo');

const router = express.Router();

router.use('/tasks', TodoRoutes);

module.exports = router;
