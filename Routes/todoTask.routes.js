"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var taskController_1 = require("../Controller/taskController");
router.get('/:listid/tasks', taskController_1.getTasksByListId); //localhost:3000/todolist/1/tasks
router.get('/task/:taskid', taskController_1.getTasksByTaskId); //localhost:3000/todolist/task/1
router.get('/completedTask', taskController_1.getAllCompletedTasks); //localhost:3000/todolist/completedTask
router.get('/pendingTasks', taskController_1.getAllPendingTasks); //localhost:3000/todolist/pendingTasks
router.get('/toggleTask/:taskid', taskController_1.toggleTaskStatusById); //localhost:3000/todolist/toggleTask/1
router.post('/addTask', taskController_1.createNewTask); //localhost:3000/todolist/addTask
router.put('/editTask', taskController_1.editTask); //localhost:3000/todolist/editTask
router["delete"]('/task/:taskid', taskController_1.deleteTaskById); //localhost:3000/todolist/task/1
exports["default"] = router;
