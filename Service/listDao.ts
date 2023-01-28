import { ToDoList } from "../Model/TodoList";
import { pool } from "../db.config/db.config";

export class listDao {

    public async create(listObj: ToDoList) {
        if (listObj.getName() == undefined || listObj.getName().trim() == "")
            return "Empty";
        if (await this.findListByName(listObj.getName()) == -1)
            return "Duplicate";
        const query = "INSERT INTO todolists values(" + listObj.getId() + ",'" + listObj.getName() + "')";
        console.log(query);
        const now = await pool.query(query);
        return "List added: " + listObj.getId() + " " + listObj.getName();
    }

    public async delete(id: number) {
        const listItem = await this.getListById(id);
        if (listItem == undefined)
            return -1;
        const query = "DELETE FROM todolists WHERE id =" + id;
        const queryTodo = "DELETE FROM todotask WHERE list_id =" + id;
        console.log(query);
        await pool.query(queryTodo);
        await pool.query(query);
        return "Task deleted successfully";
    }

    public async edit(listObj: ToDoList) {
        if (listObj.getName() == undefined || listObj.getName().trim() == "")
        return "Empty";
        if ( await this.getListById(listObj.getId()) == undefined)
            return "NA";
        const query = "UPDATE todolists SET  name='" + listObj.getName() + "' where id=" + listObj.getId();
        console.log(query);
        await pool.query(query);
        return "Task edited!";
    }

    public async getListById(id: number) {
        const query = "SELECT * from todolists where id=" + id;
        console.log(query);
        const now = await pool.query(query);
        const arr: ToDoList[] = now.rows[0];
        return arr;
    }

    public async getAllList() {
        const query = "SELECT * from todolists";
        console.log(query);
        const now = await pool.query(query);
        const arr: ToDoList[] = now.rows;
        if (arr.length == 0)
            return "No list to show";
        return arr;
    }

    public async findListByName(name: String) {
        const query = "SELECT * from todolists where name= '" + name + "'";
        console.log(query);
        const now = await pool.query(query);
        const arr: ToDoList[] = now.rows;
        if (arr.length > 0)
            return -1;
        return 0;
    }
}