import { taskDao } from "../Service/taskDao";
import { ToDoTask } from "../Model/todoTask";
import { logger } from "../Logger/logger";

export function TaskController(app) {
    const taskDaoObj = new taskDao();
    app.get('/todolist/:listid/tasks', function (req, res) {
        taskDaoObj.getTodoByListId(req.params.listid).then((r) => {
            console.log(r);
            res.send(JSON.stringify(r));
        })
    })
    app.get('/todolist/task/:taskid', function (req, res) {
        taskDaoObj.getTodoById(req.params.taskid).then((r) => {
            console.log(r);
            res.send(JSON.stringify(r));
        })
    })

    app.get('/todolist/pendingTasks', function (req, res) {
        taskDaoObj.getAllPendingTasks().then((r) => {
            console.log(r);
            res.send(JSON.stringify(r));
        })
    })

    app.get('/todolist/completedTask', function (req, res) {
        taskDaoObj.getAllCompletedTasks().then((r) => {
            console.log(r);
            res.send(JSON.stringify(r));
        })
    })

    app.get('/todolist/toggleTask/:taskid', function (req, res) {
        taskDaoObj.changeStatus(req.params.taskid).then((r) => {
            res.send("Status updated");
        })
    })
    app.delete('/todolist/task/:taskid', function (req, res) {
        taskDaoObj.deleteTodo(req.params.taskid).then(() => {
            res.send("Deleted successfully");
        })
    })
    app.post('/todolist/task', function (req, res) {
        const description = req.body.description;
        const list_id = req.body.list_id;
        var todoObj = new ToDoTask(description, list_id);
        const taskDaoObj = new taskDao();
        taskDaoObj.createTodo(todoObj).then((r) => {
            if (r == "Description empty") {
                const msg = "Name cannot be empty";
                logger.error("Attempt to create list with empty name");
                res.status(400);
                res.send(msg);
                return;
            }
            res.status(201).send("Task added: " + description);
        });
    })
    app.put('/todolist/task', function (req, res) {
        const id = req.body.id;
        const description = req.body.description;
        const taskDaoObj = new taskDao();
        taskDaoObj.editTodo(id, description).then(() => {
            res.send("Task updated: " + id + " " + description);
        });
    })
}