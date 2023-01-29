import { listDao } from "../Service/listDao";
import { ToDoList } from "../Model/TodoList";
import { logger } from "../Logger/logger";

export const getAllTodoLists = (req, res) => {
    const listDaoObj = new listDao();
            listDaoObj.getAllList().then((r) => {
                console.log(r);
                res.send(JSON.stringify(r));
            })
};

export const getTodoListById = (req, res) => {
    const listDaoObj = new listDao();
        listDaoObj.getListById(req.params.listid).then((r) => {
            if (r === undefined) {
                const msg = "List not found for given id";
                logger.error(msg + " " + req.params.listid);
                res.status(404);
                res.send(msg);
                return;
            }
            res.send(JSON.stringify(r));
        })
};

export const createNewTodoList = (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        var todoListObj = new ToDoList(id, name);
        const listDaoObj = new listDao();
        listDaoObj.create(todoListObj).then((r) => {
            if (r == "Empty") {
                const msg = "Name cannot be empty";
                logger.error("Attempt to create list with empty name");
                res.status(400);
                res.send(msg);
                return;
            }
            else if (r == "Duplicate") {
                const msg = "Name" + name + "already exists";
                logger.error(msg);
                res.status(400);
                res.send(msg);
                return;
            }
            else if (r == "Duplicate id") {
                const msg = "Id" + id + "already exists";
                logger.error(msg);
                res.status(400);
                res.send(msg);
                return;
            }
            res.status(201).send(r);
        });
};

export const deleteTodoListById = (req, res) => {
        const listDaoObj = new listDao();
        listDaoObj.delete(req.params.listid).then((r) => {
            if (r == -1) {
                const msg = "List not found for given id";
                logger.error(msg + " " + req.params.listid);
                res.status(404);
                res.send(msg);
                return;
            }
            res.send(r);
        })
};

export const updateTodoList = (req, res) => {
        const id = req.body.id;
        const name = req.body.name;
        var todoListObj = new ToDoList(id, name);
        const listDaoObj = new listDao();
        listDaoObj.edit(todoListObj).then((r) => {
            if (r == "NA") {
                const msg = "List with given id" + id + " not exist";
                res.status(400);
                res.send(msg);
                logger.error(msg);
                return;
            }
            else if (r == "Empty") {
                const msg = "Name cannot be empty";
                logger.error("Attempt to create list with empty name");
                res.status(400);
                res.send(msg);
                return;
            }
            res.send(r);
        });
};