const Task = require('../models/task.model');
const {ApiError} = require('../Helpers/AppError');

exports.addTask = async (req, res) => {
  const { title, description, dueDate, status } = req.body;
  const task = await Task.create({
    title,
    description,
    dueDate,
    status,
    userId: req.user.id
  });
  res.status(201).json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.findAll({ where: { userId: req.user.id } });
  res.json(tasks);
};


exports.getTaskById = async (req, res) => {
  const { id } = req.params;

  console.log("id>>", id);
  

  try {
    const task = await Task.findOne({
      where: {
        id,
        userId: req.user.id 
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

   res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};


exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate, status } = req.body;
  const task = await Task.findOne({ where: { id, userId: req.user.id } });
  if (!task) return res.status(404).json({ error: 'Task not found' });

  task.title = title ?? task.title;
  task.description = description ?? task.description;
  task.dueDate = dueDate ?? task.dueDate;
  task.status = status ?? task.status;
  await task.save();
  res.json(task);
};


exports.deleteById = async (req, res) => {
  const { id } = req.params;

  console.log("id>>", id);
  

  try {
   const task = await Task.destroy({
      where: {
        id,
        userId: req.user.id 
      }
    });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json({status: true, message : "task deleted successfully"});
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve task' });
  }
};