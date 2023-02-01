import { ToDoTask } from "../Model/todoTask";
import { pool } from "../db.config/db.config";
import { logger } from "../Logger/logger";

export class taskDao {

    public async createTodo(todoObj: ToDoTask) {
        if (todoObj.getDescription() == undefined|| todoObj.getDescription() == "")
            return "Description empty";
        if (await this.findTaskByName(todoObj.getDescription(), todoObj.getlistId()) == -1)
            return "Duplicate";
        const query = "INSERT INTO todotask (list_id,description,status) values(" + todoObj.getlistId() + ",'" + todoObj.getDescription() + "','" + todoObj.getStatus() + "')";
        logger.info(query);
        await pool.query(query);
        return "Task added: " + todoObj.getId() + " " + todoObj.getDescription();
    }

    public async deleteTodo(id: number) {
        const query = "DELETE FROM todotask WHERE todo_id =" + id;
        logger.info(query);
        await pool.query(query);
        return "Task deleted successfully";
    }

    public async editTodo(id: number, description: string) {
        if (description == undefined || description.trim() == "")
        return "Description empty";
        const query = "UPDATE todotask SET  description='" + description + "' where todo_id=" + id;
        logger.info(query);
        await pool.query(query);
        return "Task edited";
    }

    public async changeStatus(id: number) {
        const query = "UPDATE todotask SET  status= case status when 'Pending' then 'Completed' when 'Completed' then 'Pending' end" + " where todo_id=" + id;
        logger.info(query);
        const now = await pool.query(query);
    }

    public async getAllPendingTasks() {
        const query = "SELECT * from todotask where status like 'Pending'";
        logger.info(query);
        const now = await pool.query(query);
        const arr: ToDoTask[] = now.rows;
        return arr;
    }

    public async getAllCompletedTasks() {
        const query = "SELECT * from todotask where status like 'Completed' ";
        logger.info(query);
        const now = await pool.query(query);
        const arr: ToDoTask[] = now.rows;
        return arr;
    }

    public async getTodoById(id: number) {
        const query = "SELECT * from todotask" + " where todo_id=" + id;
        logger.info(query);
        const now = await pool.query(query);
        const arr: ToDoTask[] = now.rows;
        return arr;
    }

    public async getTodoByListId(id: number) {
        const query = "SELECT * from todotask" + " where list_id=" + id;
        logger.info(query);
        const now = await pool.query(query);
        const arr: ToDoTask[] = now.rows;
        return arr;
    }

    public async findTaskByName(name: String, id: number) {
        const query = "SELECT * from todotask where description= '" + name + "' and list_id=" + id;
        logger.info(query);
        const now = await pool.query(query);
        const arr: ToDoTask[] = now.rows;
        if (arr.length > 0)
            return -1;
        return 0;
    }
}