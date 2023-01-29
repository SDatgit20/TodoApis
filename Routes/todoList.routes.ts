const express = require('express');
const router = express.Router();

import {getAllTodoLists, getTodoListById, createNewTodoList, updateTodoList, deleteTodoListById} from '../Controller/Controller';

router.get('/', getAllTodoLists); //localhost:3000/todolist/
router.get('/:listid',getTodoListById ); //localhost:3000/todolist/1
router.post('/add', createNewTodoList); //localhost:3000/todolist/add
router.put('/edit', updateTodoList); //localhost:3000/todolist/edit
router.delete('/:listid', deleteTodoListById); //localhost:3000/todolist/1

export default router;