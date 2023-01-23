"use strict";
exports.__esModule = true;
exports.Controller = void 0;
var listDao_1 = require("./listDao");
var TodoList_1 = require("./TodoList");
function Controller(app) {
    app.get('/todo/allList', function (req, res) {
        var listDaoObj = new listDao_1.listDao();
        listDaoObj.getAllList().then(function (r) {
            console.log(r);
            res.send(JSON.stringify(r));
        });
    });
    app.get('/todo/:listid', function (req, res) {
        var listDaoObj = new listDao_1.listDao();
        listDaoObj.getListById(req.params.listid).then(function (r) {
            console.log(r);
            res.send(JSON.stringify(r));
        });
    });
    app["delete"]('/todo/:listid', function (req, res) {
        var listDaoObj = new listDao_1.listDao();
        listDaoObj["delete"](req.params.listid).then(function () {
            res.send("Deleted successfully");
        });
    });
    app.post('/todo/', function (req, res) {
        var id = req.body.id;
        var name = req.body.name;
        var todoListObj = new TodoList_1.ToDoList(id, name);
        var listDaoObj = new listDao_1.listDao();
        listDaoObj.create(todoListObj).then(function () {
            res.status(201).send("List added: " + id + " " + name);
        });
    });
    app.put('/todo/', function (req, res) {
        var id = req.body.id;
        var name = req.body.name;
        var todoListObj = new TodoList_1.ToDoList(id, name);
        var listDaoObj = new listDao_1.listDao();
        listDaoObj.edit(todoListObj).then(function () {
            res.send("List updated: " + id + " " + name);
        });
    });
}
exports.Controller = Controller;
