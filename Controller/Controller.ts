import { listDao } from "../Service/listDao";
import { ToDoList } from "../Model/TodoList";
import { pool } from "../db.config/db.config";

export function Controller(app) {
    app.get('/todo/allList', function (req, res) {
        const listDaoObj = new listDao();
        listDaoObj.getAllList().then((r) => {
            console.log(r);
            res.send(JSON.stringify(r));
        })
    })
    app.get('/todo/:listid', function (req, res) {
        const listDaoObj = new listDao();
        listDaoObj.getListById(req.params.listid).then((r) => {
            if (r === undefined) {
                res.status(404);
                res.send("List not found for given id");
                return;
            }
            res.send(JSON.stringify(r));
        })
    })
    app.delete('/todo/:listid', function (req, res) {
        const listDaoObj = new listDao();
        listDaoObj.delete(req.params.listid).then((r) => {
            if (r == -1) {
                res.status(404);
                res.send("List not found for given id");
                return;
            }
            res.send(r);
        })
    })
    app.post('/todo/', function (req, res) {
        const id = req.body.id;
        const name = req.body.name;
        var todoListObj = new ToDoList(id, name);
        const listDaoObj = new listDao();
        listDaoObj.create(todoListObj).then((r) => {
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
    })
    app.put('/todo/', function (req, res) {
        const id = req.body.id;
        const name = req.body.name;
        var todoListObj = new ToDoList(id, name);
        const listDaoObj = new listDao();
        listDaoObj.edit(todoListObj).then((r) => {
            if (r =="NA") {
                res.status(400);
                res.send("List with given id not exist");
                return;
            }
            else if(r=="Empty"){
                res.status(400);
                res.send("Name cannot be empty");
                return;
            }
            res.send(r);
        });

    })
}