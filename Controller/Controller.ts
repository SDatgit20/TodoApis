import { listDao } from "../Service/listDao";
import { ToDoList } from "../Model/TodoList";

export function Controller(app){
    app.get('/todo/allList',function(req,res){
        const listDaoObj = new listDao();
        listDaoObj.getAllList().then((r)=>{
            console.log(r);
            res.send(JSON.stringify(r));
        })
    })
    app.get('/todo/:listid',function(req,res){
        const listDaoObj = new listDao();
        listDaoObj.getListById(req.params.listid).then((r)=>{
            console.log(r);
            res.send(JSON.stringify(r));
        })
    })
    app.delete('/todo/:listid',function(req,res){
        const listDaoObj = new listDao();
        listDaoObj.delete(req.params.listid).then(()=>{
            res.send("Deleted successfully");
        })
    })
    app.post('/todo/',function(req,res){
        const id=req.body.id;
        const name=req.body.name;
        var todoListObj = new ToDoList(id, name);
        const listDaoObj = new listDao();
        listDaoObj.create(todoListObj).then(() => {
            res.status(201).send("List added: "+id+" "+name);
        });
    })
    app.put('/todo/',function(req,res){
        const id=req.body.id;
        const name=req.body.name;
        var todoListObj = new ToDoList(id, name);
        const listDaoObj = new listDao();
        listDaoObj.edit(todoListObj).then(() => {
            res.send("List updated: "+id+" "+name);
        });

    })
    }