import { ToDoList } from "../Model/TodoList";
import { pool } from "../db.config/db.config";

export class listDao{

    public async create(listObj: ToDoList) {
        var query = "INSERT INTO todolists values(" + listObj.getId() + ",'" + listObj.getName()+"')";
        console.log(query);
        const now = await pool.query(query);
    }

    public async delete(id: number) {
        var query = "DELETE FROM todolists WHERE id =" + id;
        var queryTodo="DELETE FROM todotask WHERE list_id =" + id ;
        console.log(query);
        await pool.query(queryTodo);
        await pool.query(query);
    }

    public async edit(listObj: ToDoList) {
        var query="UPDATE todolists SET  name='" + listObj.getName() + "' where id=" + listObj.getId();
        console.log(query);
        const now = await pool.query(query);
    }


    public async getListById(id: number) {
        var query="SELECT * from todolists" + " where id=" + id;
        console.log(query);
        const now = await pool.query(query);
        var arr: ToDoList[] = now.rows[0];
        return arr;
    }

    public async getAllList() {
        var query="SELECT * from todolists";
        console.log(query);
        const now = await pool.query(query);
        var arr: ToDoList[] = now.rows;
        return arr;
    }
}