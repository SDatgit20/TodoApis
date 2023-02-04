import { taskDao } from "../Service/taskDao";
import { ToDoTask } from "../Model/todoTask";
import { logger } from "../Logger/logger";

export const getTasksByListId = (req, res) => {
    const taskDaoObj = new taskDao();
    taskDaoObj.getTodoByListId(req.params.listid).then((r) => {
        logger.info(r);
        res.send(JSON.stringify(r));
    })
};


export const getTasksByTaskId = (req, res) => {
    const taskDaoObj = new taskDao();
    taskDaoObj.getTodoById(req.params.taskid).then((r) => {
        logger.info(r);
        res.send(JSON.stringify(r));
    })
};

export const getAllPendingTasks = (req, res) => {
    const taskDaoObj = new taskDao();
    taskDaoObj.getAllPendingTasks().then((r) => {
        logger.info(r);
        res.send(JSON.stringify(r));
    })
};

export const getAllCompletedTasks = (req, res) => {
    const taskDaoObj = new taskDao();
    taskDaoObj.getAllCompletedTasks().then((r) => {
        logger.info(r);
        res.send(JSON.stringify(r));
    })
};

export const toggleTaskStatusById = (req, res) => {
    const taskDaoObj = new taskDao();
    taskDaoObj.changeStatus(req.params.taskid).then((r) => {
        logger.info(r);
        res.send("Status updated");
    })
};

export const deleteTaskById = (req, res) => {
    const taskDaoObj = new taskDao();
    taskDaoObj.deleteTodo(req.params.taskid).then(() => {
        res.send("Deleted successfully");
    })
};

export const createNewTask = (req, res) => {
    const taskDaoObj = new taskDao();
    const description = req.body.description;
    const list_id = req.body.list_id;
    const todoObj = new ToDoTask(description, list_id);
    taskDaoObj.createTodo(todoObj).then((r) => {
        if (r == "Description empty") {
            const msg = "Name cannot be empty";
            logger.error("Attempt to create list with empty name");
            res.status(400);
            res.json({message:msg});
            return;
        }
        res.status(201).send("Task added: " + description);
    });
};

export const editTask = (req, res) => {
    const taskDaoObj = new taskDao();
    const id = req.body.id;
    const description = req.body.description;
    taskDaoObj.editTodo(id, description).then(() => {
        res.send("Task updated: " + id + " " + description);
    });
};