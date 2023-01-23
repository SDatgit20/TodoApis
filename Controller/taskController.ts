import { taskDao } from "../Service/taskDao";
import { ToDoTask } from "../Model/todoTask";

export function TaskController(app){
    const taskDaoObj = new taskDao();
    app.get('/todo/list/:listid',function(req,res){
        taskDaoObj.getTodoByListId(req.params.listid).then((r)=>{
            console.log(r);
            res.send(JSON.stringify(r));
        })
    })
    app.get('/todo/task/:taskid',function(req,res){
        taskDaoObj.getTodoById(req.params.taskid).then((r)=>{
            console.log(r);
            res.send(JSON.stringify(r));
        })
    })

    app.get('/todo/pendingTaskFromList/:listid',function(req,res){
        taskDaoObj.getAllPendingTasks(req.params.listid).then((r)=>{
            console.log(r);
            res.send(JSON.stringify(r));
        })
    })

    app.get('/todo/completedTaskFromList/:listid',function(req,res){
        taskDaoObj.getAllCompletedTasks(req.params.listid).then((r)=>{
            console.log(r);
            res.send(JSON.stringify(r));
        })
    })

    app.get('/todo/toggleTask/:taskid',function(req,res){
        taskDaoObj.changeStatus(req.params.taskid).then((r)=>{
            res.send("Status updated");
        })
    })
    app.delete('/todo/task/:taskid',function(req,res){
        taskDaoObj.deleteTodo(req.params.taskid).then(()=>{
            res.send("Deleted successfully");
        })
    })
    app.post('/todo/task/',function(req,res){
        const description=req.body.description;
        const list_id=req.body.list_id;
        var todoObj = new ToDoTask(description,list_id);
        const taskDaoObj = new taskDao();
        taskDaoObj.createTodo(todoObj).then(() => {
            res.status(201).send("Task added: "+description);
        });
    })
    app.put('/todo/edit/',function(req,res){
        const id=req.body.id;
        const description=req.body.description;
        const taskDaoObj = new taskDao();
        taskDaoObj.editTodo(id,description).then(() => {
            res.send("Task updated: "+id+" "+description);
        });
    })
    }