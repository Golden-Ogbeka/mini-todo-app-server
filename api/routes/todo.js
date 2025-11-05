const express = require('express');
const router = express.Router();
const { body, param, header } = require('express-validator');
const TodoController = require('../controllers/todo')();

router.get('/', TodoController.GetAllTasks);

router.get('/view/:id', TodoController.GetSingleTask);

router.post(
  '/',
  [
    body('title', 'Title is required')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .trim(),
  ],
  TodoController.AddTask
);

router.put(
  '/:id',
  [
    param('id', 'ID is required')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isInt()
      .toInt()
      .withMessage('ID must be an integer'),
    body('title', 'Title is required')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .trim(),
  ],
  TodoController.UpdateTask
);

router.patch(
  '/completed/:id',
  [
    param('id', 'ID is required')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isInt()
      .toInt()
      .withMessage('ID must be an integer'),
    body('completed', 'Completed field is required')
      .isBoolean()
      .withMessage('Completed field can either be true or false')
      .toBoolean(),
  ],
  TodoController.ToggleTaskCompletion
);

router.delete(
  '/:id',
  [
    param('id', 'ID is required')
      .exists({
        checkFalsy: true,
        checkNull: true,
      })
      .isInt()
      .toInt()
      .withMessage('ID must be an integer'),
  ],
  TodoController.DeleteTask
);

module.exports = router;
