"use strict";
exports.__esModule = true;
var express = require('express');
var router = express.Router();
var Controller_1 = require("../Controller/Controller");
router.get('/', Controller_1.getAllTodoLists); //localhost:3000/todolist/
router.get('/:listid', Controller_1.getTodoListById); //localhost:3000/todolist/1
router.post('/add', Controller_1.createNewTodoList); //localhost:3000/todolist/add
router.put('/edit', Controller_1.updateTodoList); //localhost:3000/todolist/edit
router["delete"]('/:listid', Controller_1.deleteTodoListById); //localhost:3000/todolist/1
exports["default"] = router;
