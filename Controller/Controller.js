"use strict";
exports.__esModule = true;
exports.updateTodoList = exports.deleteTodoListById = exports.createNewTodoList = exports.getTodoListById = exports.getAllTodoLists = void 0;
var listDao_1 = require("../Service/listDao");
var TodoList_1 = require("../Model/TodoList");
var logger_1 = require("../Logger/logger");
var getAllTodoLists = function (req, res) {
    var listDaoObj = new listDao_1.listDao();
    listDaoObj.getAllList().then(function (r) {
        console.log(r);
        res.send(JSON.stringify(r));
    });
};
exports.getAllTodoLists = getAllTodoLists;
var getTodoListById = function (req, res) {
    var listDaoObj = new listDao_1.listDao();
    listDaoObj.getListById(req.params.listid).then(function (r) {
        if (r === undefined) {
            var msg = "List not found for given id";
            logger_1.logger.error(msg + " " + req.params.listid);
            res.status(404);
            res.send(msg);
            return;
        }
        res.send(JSON.stringify(r));
    });
};
exports.getTodoListById = getTodoListById;
var createNewTodoList = function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var todoListObj = new TodoList_1.ToDoList(id, name);
    var listDaoObj = new listDao_1.listDao();
    listDaoObj.create(todoListObj).then(function (r) {
        if (r == "Empty") {
            var msg = "Name cannot be empty";
            logger_1.logger.error("Attempt to create list with empty name");
            res.status(400);
            res.send(msg);
            return;
        }
        else if (r == "Duplicate") {
            var msg = "Name" + name + "already exists";
            logger_1.logger.error(msg);
            res.status(400);
            res.send(msg);
            return;
        }
        else if (r == "Duplicate id") {
            var msg = "Id" + id + "already exists";
            logger_1.logger.error(msg);
            res.status(400);
            res.send(msg);
            return;
        }
        res.status(201).send(r);
    });
};
exports.createNewTodoList = createNewTodoList;
var deleteTodoListById = function (req, res) {
    var listDaoObj = new listDao_1.listDao();
    listDaoObj["delete"](req.params.listid).then(function (r) {
        if (r == -1) {
            var msg = "List not found for given id";
            logger_1.logger.error(msg + " " + req.params.listid);
            res.status(404);
            res.send(msg);
            return;
        }
        res.send(r);
    });
};
exports.deleteTodoListById = deleteTodoListById;
var updateTodoList = function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var todoListObj = new TodoList_1.ToDoList(id, name);
    var listDaoObj = new listDao_1.listDao();
    listDaoObj.edit(todoListObj).then(function (r) {
        if (r == "NA") {
            var msg = "List with given id" + id + " not exist";
            res.status(400);
            res.send(msg);
            logger_1.logger.error(msg);
            return;
        }
        else if (r == "Empty") {
            var msg = "Name cannot be empty";
            logger_1.logger.error("Attempt to create list with empty name");
            res.status(400);
            res.send(msg);
            return;
        }
        res.send(r);
    });
};
exports.updateTodoList = updateTodoList;
