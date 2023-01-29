"use strict";
exports.__esModule = true;
exports.TaskController = void 0;
var taskDao_1 = require("../Service/taskDao");
var todoTask_1 = require("../Model/todoTask");
var logger_1 = require("../Logger/logger");
function TaskController(app) {
    var taskDaoObj = new taskDao_1.taskDao();
    app.get('/todolist/:listid/tasks', function (req, res) {
        taskDaoObj.getTodoByListId(req.params.listid).then(function (r) {
            console.log(r);
            res.send(JSON.stringify(r));
        });
    });
    app.get('/todolist/task/:taskid', function (req, res) {
        taskDaoObj.getTodoById(req.params.taskid).then(function (r) {
            console.log(r);
            res.send(JSON.stringify(r));
        });
    });
    app.get('/todolist/pendingTasks', function (req, res) {
        taskDaoObj.getAllPendingTasks().then(function (r) {
            console.log(r);
            res.send(JSON.stringify(r));
        });
    });
    app.get('/todolist/completedTask', function (req, res) {
        taskDaoObj.getAllCompletedTasks().then(function (r) {
            console.log(r);
            res.send(JSON.stringify(r));
        });
    });
    app.get('/todolist/toggleTask/:taskid', function (req, res) {
        taskDaoObj.changeStatus(req.params.taskid).then(function (r) {
            res.send("Status updated");
        });
    });
    app["delete"]('/todolist/task/:taskid', function (req, res) {
        taskDaoObj.deleteTodo(req.params.taskid).then(function () {
            res.send("Deleted successfully");
        });
    });
    app.post('/todolist/task', function (req, res) {
        var description = req.body.description;
        var list_id = req.body.list_id;
        var todoObj = new todoTask_1.ToDoTask(description, list_id);
        var taskDaoObj = new taskDao_1.taskDao();
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
    });
    app.put('/todolist/task', function (req, res) {
        var id = req.body.id;
        var description = req.body.description;
        var taskDaoObj = new taskDao_1.taskDao();
        taskDaoObj.editTodo(id, description).then(function () {
            res.send("Task updated: " + id + " " + description);
        });
    });
}
exports.TaskController = TaskController;
