import { ToDoTask } from "../Model/todoTask";
import { pool } from "../db.config/db.config";

export class taskDao {

    public async createTodo(todoObj: ToDoTask) {
        const query = "INSERT INTO todotask (list_id,description,status) values(" + todoObj.getlistId() + ",'" + todoObj.getDescription() + "','" + todoObj.getStatus() + "')";
        console.log(query);
        const now = await pool.query(query);
    }

    public async deleteTodo(id: number) {
        const query = "DELETE FROM todotask WHERE todo_id =" + id;
        console.log(query);
        const now = await pool.query(query);
    }

    public async editTodo(id: number, description: string) {
        const query = "UPDATE todotask SET  description='" + description + "' where todo_id=" + id;
        console.log(query);
        const now = await pool.query(query);
    }

    public async changeStatus(id: number) {
        const query = "UPDATE todotask SET  status= case status when 'Pending' then 'Completed' when 'Completed' then 'Pending' end" + " where todo_id=" + id;
        console.log(query);
        const now = await pool.query(query);
    }

    public async getAllPendingTasks(id: number) {
        const query = "SELECT * from todotask where status like 'Pending' and list_id=" + id;
        console.log(query);
        const now = await pool.query(query);
        const arr: ToDoTask[] = now.rows;
        return arr;
    }

    public async getAllCompletedTasks(id: number) {
        var query = "SELECT * from todotask where status like 'Completed' and list_id=" + id;
        console.log(query);
        const now = await pool.query(query);
        var arr: ToDoTask[] = now.rows;
        return arr;
    }

    public async getTodoById(id: number) {
        const query = "SELECT * from todotask" + " where todo_id=" + id;
        console.log(query);
        const now = await pool.query(query);
        const arr: ToDoTask[] = now.rows;
        return arr;
    }

    public async getTodoByListId(id: number) {
        const query = "SELECT * from todotask" + " where list_id=" + id;
        console.log(query);
        const now = await pool.query(query);
        const arr: ToDoTask[] = now.rows;
        return arr;
    }
}