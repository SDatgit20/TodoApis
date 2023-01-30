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
        res.status(200);
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
        else {
            res.status(200);
            res.send(JSON.stringify(r));
        }
    });
};
exports.getTodoListById = getTodoListById;
var createNewTodoList = function (req, res) {
    var id = req.body.id;
    var name = req.body.name;
    var todoListObj = new TodoList_1.ToDoList(id, name);
    var listDaoObj = new listDao_1.listDao();
    listDaoObj.create(todoListObj).then(function (r) {
        switch (r) {
            case "Empty":
                logger_1.logger.error("Attempt to create list with empty name");
                res.status(400);
                res.send("Name cannot be empty");
                return;
            case "Duplicate":
                var msgDuplicateName = "Name" + name + "already exists";
                logger_1.logger.error(msgDuplicateName);
                res.status(400);
                res.send(msgDuplicateName);
                return;
            case "Duplicate id":
                var msgDuplicateId = "Id" + id + "already exists";
                logger_1.logger.error(msgDuplicateId);
                res.status(400);
                res.send(msgDuplicateId);
                return;
            default:
                res.status(201);
                res.send(r);
                break;
        }
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
        else
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
        switch (r) {
            case "NA":
                var msgNA = "List with given id" + id + " not exist";
                res.status(400);
                res.send(msgNA);
                logger_1.logger.error(msgNA);
                return;
            case "Empty":
                var msgEmpty = "Name cannot be empty";
                logger_1.logger.error("Attempt to create list with empty name");
                res.status(400);
                res.send(msgEmpty);
                return;
            default:
                res.send(r);
                break;
        }
    });
};
exports.updateTodoList = updateTodoList;
