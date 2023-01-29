"use strict";
exports.__esModule = true;
exports.editTask = exports.createNewTask = exports.deleteTaskById = exports.toggleTaskStatusById = exports.getAllCompletedTasks = exports.getAllPendingTasks = exports.getTasksByTaskId = exports.getTasksByListId = void 0;
var taskDao_1 = require("../Service/taskDao");
var todoTask_1 = require("../Model/todoTask");
var logger_1 = require("../Logger/logger");
var getTasksByListId = function (req, res) {
    var taskDaoObj = new taskDao_1.taskDao();
    taskDaoObj.getTodoByListId(req.params.listid).then(function (r) {
        console.log(r);
        res.send(JSON.stringify(r));
    });
};
exports.getTasksByListId = getTasksByListId;
var getTasksByTaskId = function (req, res) {
    var taskDaoObj = new taskDao_1.taskDao();
    taskDaoObj.getTodoById(req.params.taskid).then(function (r) {
        console.log(r);
        res.send(JSON.stringify(r));
    });
};
exports.getTasksByTaskId = getTasksByTaskId;
var getAllPendingTasks = function (req, res) {
    var taskDaoObj = new taskDao_1.taskDao();
    taskDaoObj.getAllPendingTasks().then(function (r) {
        console.log(r);
        res.send(JSON.stringify(r));
    });
};
exports.getAllPendingTasks = getAllPendingTasks;
var getAllCompletedTasks = function (req, res) {
    var taskDaoObj = new taskDao_1.taskDao();
    taskDaoObj.getAllCompletedTasks().then(function (r) {
        console.log(r);
        res.send(JSON.stringify(r));
    });
};
exports.getAllCompletedTasks = getAllCompletedTasks;
var toggleTaskStatusById = function (req, res) {
    var taskDaoObj = new taskDao_1.taskDao();
    taskDaoObj.changeStatus(req.params.taskid).then(function (r) {
        res.send("Status updated");
    });
};
exports.toggleTaskStatusById = toggleTaskStatusById;
var deleteTaskById = function (req, res) {
    var taskDaoObj = new taskDao_1.taskDao();
    taskDaoObj.deleteTodo(req.params.taskid).then(function () {
        res.send("Deleted successfully");
    });
};
exports.deleteTaskById = deleteTaskById;
var createNewTask = function (req, res) {
    var taskDaoObj = new taskDao_1.taskDao();
    var description = req.body.description;
    var list_id = req.body.list_id;
    var todoObj = new todoTask_1.ToDoTask(description, list_id);
    taskDaoObj.createTodo(todoObj).then(function (r) {
        if (r == "Description empty") {
            var msg = "Name cannot be empty";
            logger_1.logger.error("Attempt to create list with empty name");
            res.status(400);
            res.send(msg);
            return;
        }
        res.status(201).send("Task added: " + description);
    });
};
exports.createNewTask = createNewTask;
var editTask = function (req, res) {
    var taskDaoObj = new taskDao_1.taskDao();
    var id = req.body.id;
    var description = req.body.description;
    taskDaoObj.editTodo(id, description).then(function () {
        res.send("Task updated: " + id + " " + description);
    });
};
exports.editTask = editTask;
