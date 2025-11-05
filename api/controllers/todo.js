const { validationResult } = require('express-validator');
const { Todo } = require('../../models');
const { getSequelizeDateFilters } = require('../../functions/filters');
const { paginate, getResponseVariables } = require('./pagination');

const Controller = () => {
  const GetAllTasks = async (req, res) => {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { from, to, limit, page } = req.query;

      // find all tasks
      const tasksData = await Todo.findAndCountAll({
        order: [['id', 'ASC']],
        ...getSequelizeDateFilters({ from, to }),
        ...paginate({ limit, page }),
      });

      return res.status(200).json({
        message: 'All tasks Retrieved',
        data: getResponseVariables(tasksData, limit),
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error?.message || 'Internal Server Error' });
    }
  };

  const GetSingleTask = async (req, res) => {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { id } = req.params;

      // find task
      const task = await Todo.findByPk(id);

      return res.status(200).json({
        message: 'Task Retrieved',
        task,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error?.message || 'Internal Server Error' });
    }
  };

  const AddTask = async (req, res) => {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { title, completed } = req.body;

      const newTask = await Todo.create({
        title,
        completed,
      });

      return res.status(201).json({
        message: 'Task created successfully',
        data: newTask,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error?.message || 'Internal Server Error' });
    }
  };

  const UpdateTask = async (req, res) => {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { title } = req.body;
      const { id } = req.params;

      const existingTask = await Todo.findByPk(id);
      if (!existingTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      existingTask.title = title;

      await existingTask.save();

      return res.status(200).json({
        message: 'Task updated successfully',
        task: existingTask,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error?.message || 'Internal Server Error' });
    }
  };

  const ToggleTaskCompletion = async (req, res) => {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { completed } = req.body;
      const { id } = req.params;

      const existingTask = await Todo.findByPk(id);
      if (!existingTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      existingTask.completed = completed;

      await existingTask.save();

      return res.status(200).json({
        message: 'Task updated successfully',
        task: existingTask,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error?.message || 'Internal Server Error' });
    }
  };

  const DeleteTask = async (req, res) => {
    try {
      // check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty())
        return res.status(422).json({ errors: errors.array() });

      const { id } = req.params;

      const existingTask = await Todo.findByPk(id);
      if (!existingTask) {
        return res.status(404).json({ message: 'Task not found' });
      }

      await existingTask.destroy();

      return res.status(200).json({
        message: 'Task deleted successfully',
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: error?.message || 'Internal Server Error' });
    }
  };

  return {
    GetAllTasks,
    AddTask,
    GetSingleTask,
    UpdateTask,
    ToggleTaskCompletion,
    DeleteTask,
  };
};

module.exports = Controller;
