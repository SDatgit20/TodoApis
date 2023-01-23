"use strict";
exports.__esModule = true;
exports.TaskController = void 0;
var taskDao_1 = require("./taskDao");
var todoTask_1 = require("./todoTask");
function TaskController(app) {
    var taskDaoObj = new taskDao_1.taskDao();
    app.get('/todo/list/:listid', function (req, res) {
        taskDaoObj.getTodoByListId(req.params.listid).then(function (r) {
            console.log(r);
            res.send(JSON.stringify(r));
        });
    });
    app.get('/todo/task/:taskid', function (req, res) {
        taskDaoObj.getTodoById(req.params.taskid).then(function (r) {
            console.log(r);
            res.send(JSON.stringify(r));
        });
    });
    app.get('/todo/pendingTaskFromList/:listid', function (req, res) {
        taskDaoObj.getAllPendingTasks(req.params.listid).then(function (r) {
            console.log(r);
            res.send(JSON.stringify(r));
        });
    });
    app.get('/todo/completedTaskFromList/:listid', function (req, res) {
        taskDaoObj.getAllCompletedTasks(req.params.listid).then(function (r) {
            console.log(r);
            res.send(JSON.stringify(r));
        });
    });
    app.get('/todo/toggleTask/:taskid', function (req, res) {
        taskDaoObj.changeStatus(req.params.taskid).then(function (r) {
            res.send("Status updated");
        });
    });
    app["delete"]('/todo/task/:taskid', function (req, res) {
        taskDaoObj.deleteTodo(req.params.taskid).then(function () {
            res.send("Deleted successfully");
        });
    });
    app.post('/todo/task/', function (req, res) {
        var description = req.body.description;
        var list_id = req.body.list_id;
        var todoObj = new todoTask_1.ToDoTask(description, list_id);
        var taskDaoObj = new taskDao_1.taskDao();
        taskDaoObj.createTodo(todoObj).then(function () {
            res.status(201).send("Task added: " + description);
        });
    });
    app.put('/todo/edit/', function (req, res) {
        var id = req.body.id;
        var description = req.body.description;
        var taskDaoObj = new taskDao_1.taskDao();
        taskDaoObj.editTodo(id, description).then(function () {
            res.send("Task updated: " + id + " " + description);
        });
    });
}
exports.TaskController = TaskController;
