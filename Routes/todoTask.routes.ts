const express = require('express');
const router = express.Router();

import { getAllCompletedTasks, getAllPendingTasks, getTasksByTaskId, getTasksByListId, deleteTaskById, createNewTask, editTask, toggleTaskStatusById } from '../Controller/taskController';

router.get('/:listid/tasks', getTasksByListId);
router.get('/task/:taskid', getTasksByTaskId);
router.get('/completedTask', getAllCompletedTasks);
router.get('/pendingTasks', getAllPendingTasks);
router.get('/toggleTask/:taskid', toggleTaskStatusById);
router.post('/addTask', createNewTask);
router.put('/editTask', editTask);
router.delete('/task/:taskid', deleteTaskById); 

export default router;