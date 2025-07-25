const express = require('express');
const { addTask, getTasks, updateTask, getTaskById, deleteById } = require('../controller/task.controller.js');
const auth = require('../middleware/auth.middleware.js');
const router = express.Router();

router.post('/create', auth, addTask);
router.get('/gettask', auth, getTasks);
router.put('/update/:id', auth, updateTask);
router.get('/gettaskbyid/:id', auth, getTaskById);
router.delete('/deletebyid/:id', auth, deleteById);

module.exports = router;
