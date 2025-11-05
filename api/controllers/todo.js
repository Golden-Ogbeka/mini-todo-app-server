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

  return {
    GetAllTasks,
  };
};

module.exports = Controller;
