const express = require('express');
const router = express.Router();

import {getAllCompletedTasks, getAllPendingTasks, getTasksByTaskId, getTasksByListId, deleteTaskById, createNewTask, editTask, toggleTaskStatusById} from '../Controller/taskController';

router.get('/:listid/tasks', getTasksByListId); //localhost:3000/todolist/1/tasks
router.get('/task/:taskid',getTasksByTaskId ); //localhost:3000/todolist/task/1
router.get('/completedTask',getAllCompletedTasks ); //localhost:3000/todolist/completedTask
router.get('/pendingTasks',getAllPendingTasks ); //localhost:3000/todolist/pendingTasks
router.get('/toggleTask/:taskid',toggleTaskStatusById ); //localhost:3000/todolist/toggleTask/1
router.post('/addTask', createNewTask); //localhost:3000/todolist/addTask
router.put('/editTask', editTask); //localhost:3000/todolist/editTask
router.delete('/task/:taskid', deleteTaskById); //localhost:3000/todolist/task/1

export default router;