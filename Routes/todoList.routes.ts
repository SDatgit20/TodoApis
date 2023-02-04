const express = require('express');
const router = express.Router();

import { getAllTodoLists, getTodoListById, createNewTodoList, updateTodoList, deleteTodoListById } from '../Controller/Controller';

router.get('/', getAllTodoLists);
router.get('/:listid', getTodoListById);
router.post('/add-list', createNewTodoList);
router.put('/edit-list', updateTodoList);
router.delete('/:listid', deleteTodoListById);

export default router;