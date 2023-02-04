import { listDao } from "../Service/listDao";
import { ToDoList } from "../Model/TodoList";
import { logger } from "../Logger/logger";

export const getAllTodoLists = (req, res) => {
    const listDaoObj = new listDao();
    listDaoObj.getAllList().then((r) => {
        logger.info(r);
        res.status(200);
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
            res.json({message:msg});
            return;
        }
            res.status(200);
            res.send(JSON.stringify(r));
    })
};

export const createNewTodoList = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const todoListObj = new ToDoList(id, name);
    const listDaoObj = new listDao();
    listDaoObj.create(todoListObj).then((r) => {
        switch (r) {
            case "Empty":
                logger.error("Attempt to create list with empty name");
                res.status(400);
                res.send("Name cannot be empty");
                return;
            case "Duplicate":
                const msgDuplicateName = "Name" + name + "already exists";
                logger.error(msgDuplicateName);
                res.status(400);
                res.json({message:msgDuplicateName});
                return;
            case "Duplicate id":
                const msgDuplicateId = "Id" + id + "already exists";
                logger.error(msgDuplicateId);
                res.status(400);
                res.json({message:msgDuplicateId});
                return;
            default:
                res.status(201);
                res.send(r);
                break;
        }
    });
};

export const deleteTodoListById = (req, res) => {
    const listDaoObj = new listDao();
    listDaoObj.delete(req.params.listid).then((r) => {
        if (r === -1) {
            const msg = "List not found for given id";
            logger.error(msg + " " + req.params.listid);
            res.status(404);
            res.json({message:msg});
            return;
        }
            res.send(r);
    })
};

export const updateTodoList = (req, res) => {
    const id = req.body.id;
    const name = req.body.name;
    const todoListObj = new ToDoList(id, name);
    const listDaoObj = new listDao();
    listDaoObj.edit(todoListObj).then((r) => {
        switch (r) {
            case "NA":
                const msgNA = "List with given id" + id + " not exist";
                res.status(400);
                res.json({message:msgNA});
                logger.error(msgNA);
                return;
            case "Empty":
                const msgEmpty = "Name cannot be empty";
                logger.error("Attempt to create list with empty name");
                res.status(400);
                res.json({message:msgEmpty});
                return;
            default:
                res.send(r);
                break;
        }
    });
};

//JSON response- 4xx 5xx
//no response in case of 201
//ts lint or es lint
//string template
//const {id, name} = req.body destructuring
// ++aysnc await vs .then
// try queries with migrations