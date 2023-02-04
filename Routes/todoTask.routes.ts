const express = require('express');
const router = express.Router();

import { getAllCompletedTasks, getAllPendingTasks, getTasksByTaskId, getTasksByListId, deleteTaskById, createNewTask, editTask, toggleTaskStatusById } from '../Controller/taskController';

router.get('/:listid/tasks', getTasksByListId);
router.get('/task/:taskid', getTasksByTaskId);
router.get('/completed-tasks', getAllCompletedTasks);
router.get('/pending-tasks', getAllPendingTasks);
router.get('/toggle-task/:taskid', toggleTaskStatusById); //patch
router.post('/add-task', createNewTask);
router.put('/edit-task', editTask);
router.delete('/task/:taskid', deleteTaskById);

export default router;

