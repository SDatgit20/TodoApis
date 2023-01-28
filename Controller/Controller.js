"use strict";
exports.__esModule = true;
exports.Controller = void 0;
var listDao_1 = require("../Service/listDao");
var TodoList_1 = require("../Model/TodoList");
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
            if (r === undefined) {
                res.status(404);
                res.send("List not found for given id");
                return;
            }
            res.send(JSON.stringify(r));
        });
    });
    app["delete"]('/todo/:listid', function (req, res) {
        var listDaoObj = new listDao_1.listDao();
        listDaoObj["delete"](req.params.listid).then(function (r) {
            if (r == -1) {
                res.status(404);
                res.send("List not found for given id");
                return;
            }
            res.send(r);
        });
    });
    app.post('/todo/', function (req, res) {
        var id = req.body.id;
        var name = req.body.name;
        var todoListObj = new TodoList_1.ToDoList(id, name);
        var listDaoObj = new listDao_1.listDao();
        listDaoObj.create(todoListObj).then(function (r) {
            if (r == "Empty") {
                res.status(400);
                res.send("Name cannot be empty");
                return;
            }
            else if (r == "Duplicate") {
                res.status(400);
                res.send("Name already exists");
                return;
            }
            res.status(201).send(r);
        });
    });
    app.put('/todo/', function (req, res) {
        var id = req.body.id;
        var name = req.body.name;
        var todoListObj = new TodoList_1.ToDoList(id, name);
        var listDaoObj = new listDao_1.listDao();
        listDaoObj.edit(todoListObj).then(function (r) {
            if (r == "NA") {
                res.status(400);
                res.send("List with given id not exist");
                return;
            }
            else if (r == "Empty") {
                res.status(400);
                res.send("Name cannot be empty");
                return;
            }
            res.send(r);
        });
    });
}
exports.Controller = Controller;
