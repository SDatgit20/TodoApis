const { taskDao } = require("../Service/taskDao");
const chai = require("chai");
const expect = chai.expect;
const Todo = require("../Model/todoTask");
const sinon = require("sinon");
const pgPool = require('pg-pool');
const { logger } = require("../Logger/logger");

describe("Todo task Service Unit Tests", function () {
    this.afterEach(() => {
        sinon.restore();
    });
    describe("Create new todo unit tests", function () {
        it("should successfully add a todo", async function () {
            const id = 1;
            const listid = 1;
            const description = "Code";
            const todo = new Todo.ToDoTask(listid, description);
            const postgreeStubQuery = sinon.stub(pgPool.prototype, 'query');
            const todoDaoObj = new taskDao();
            sinon.stub(taskDao.prototype, "findTaskByName").returns(0);
            sinon.stub(Todo.ToDoTask.prototype, "getId").returns(id);
            sinon.stub(Todo.ToDoTask.prototype, "getlistId").returns(listid);
            sinon.stub(Todo.ToDoTask.prototype, "getDescription").returns(description);

            const returnedUser = await todoDaoObj.createTodo(todo);

            expect(postgreeStubQuery.calledWith("INSERT INTO todotask (list_id,description,status) values(1,'Code','Pending')")).to.equal(true);
            expect(returnedUser).to.equal("Task added: 1 Code");
        });

        it("should not save task when name is empty", async function () {
            const listid = 1;
            const description = "";
            const todo = new Todo.ToDoTask(listid, description);
            const todoDaoObj = new taskDao();
            sinon.stub(Todo.ToDoTask.prototype, "getDescription").returns(description);

            const returnedUser = await todoDaoObj.createTodo(todo);

            expect(returnedUser).to.equal("Description empty");
        });
    });

    describe("Delete list unit tests", function () {
        it("should delete list when given id exists", async function () {
            const id = 1;
            const postgreeStubQuery = sinon.stub(pgPool.prototype, 'query');
            const todoDaoObj = new taskDao();

            const returnedUser = await todoDaoObj.deleteTodo(id);

            expect(postgreeStubQuery.calledWith("DELETE FROM todotask WHERE todo_id =" + id)).to.equal(true);
            expect(returnedUser).to.equal("Task deleted successfully");
        });
    });

    describe("Edit list unit tests", function () {
        it("should edit list when proper name is given and the list id exists", async function () {
            const id = 1;
            const description = "Code";
            const postgreeStubQuery = sinon.stub(pgPool.prototype, 'query');
            const todoDaoObj = new taskDao();

            const returnedUser = await todoDaoObj.editTodo(id, description);

            expect(postgreeStubQuery.calledWith("UPDATE todotask SET  description='" + description + "' where todo_id=" + id)).to.equal(true);
            expect(returnedUser).to.equal("Task edited");
        });


        it("should not edit task when name is empty", async function () {
            const id = 1;
            const description = "";
            const todoDaoObj = new taskDao();
            sinon.stub(Todo.ToDoTask.prototype, "getDescription").returns(description);

            const returnedUser = await todoDaoObj.editTodo(id, description);

            expect(returnedUser).to.equal("Description empty");
        });
    });

    describe("Get pending task unit tests", function () {
        it("should give all pending tasks when exist", async function () {
            const todoDaoObj = new taskDao();
            const postgreeStubQuery = sinon.stub(pgPool.prototype, 'query').returns({ rows: [{ "id": 1, "description": "Code", "listid": 1, "status": "Pending" }] })
            const returnedUser = await todoDaoObj.getAllPendingTasks();

            expect(postgreeStubQuery.calledWith("SELECT * from todotask where status like 'Pending'")).to.equal(true);
            expect(returnedUser).to.be.a('array');
        });
    });

    describe("Get completed task unit tests", function () {
        it("should give all completed tasks when exist", async function () {
            const todoDaoObj = new taskDao();
            const postgreeStubQuery = sinon.stub(pgPool.prototype, 'query').returns({ rows: [{ "id": 1, "description": "Code", "listid": 1, "status": "Completed" }] })
            const returnedUser = await todoDaoObj.getAllCompletedTasks();

            expect(postgreeStubQuery.calledWith("SELECT * from todotask where status like 'Completed' ")).to.equal(true);
            expect(returnedUser).to.be.a('array');
        });
    });

});