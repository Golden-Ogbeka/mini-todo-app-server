const express = require('express');
const router = express.Router();
const { body, param, header } = require('express-validator');
const TodoController = require('../controllers/todo')();

router.get('/', TodoController.GetAllTasks);

// // Get user by id
// router.get('/view/:id', TodoController.ViewUser);

// router.post(
//   '/login',
//   [
//     body('email', 'Email is required')
//       .trim()
//       .exists()
//       .bail()
//       .isEmail()
//       .normalizeEmail({ all_lowercase: true })
//       .withMessage('Invalid Email format'),
//     body('password', 'Password is required').trim().exists(),
//   ],
//   TodoController.Login
// );

module.exports = router;
