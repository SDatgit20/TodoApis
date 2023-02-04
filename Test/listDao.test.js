const { listDao } = require("../Service/listDao");
const chai = require("chai");
const expect = chai.expect;
const List = require("../Model/TodoList");
const sinon = require("sinon");
const pgPool = require('pg-pool');

describe("List Service Unit Tests", function () {
    this.afterEach(() => {
        sinon.restore();
    });
    describe("Create new list unit tests", function () {
        it("should successfully add a list", async function () {
            const id = 1;
            const name = "Code";
            const list = new List.ToDoList(id, name);
            const postgreeStubQuery = sinon.stub(pgPool.prototype, 'query');
            const listDaoObj = new listDao();
            sinon.stub(listDao.prototype, "findListByName").returns(0);
            sinon.stub(listDao.prototype, "getListById").returns(undefined);

            const returnedUser = await listDaoObj.create(list);

            expect(postgreeStubQuery.calledWith("INSERT INTO todolists values(1,'Code')")).to.equal(true);
            expect(returnedUser).to.equal("List added: 1 Code");
        });

        it("should not save list when name is empty", async function () {
            const id = 1;
            const name = "";
            const list = new List.ToDoList(id, name);
            const listDaoObj = new listDao();

            const returnedUser = await listDaoObj.create(list);

            expect(returnedUser).to.equal("Empty");
        });
    });

    describe("Delete list unit tests", function () {

        it("should delete list when given id exists", async function () {
            const id = 1;
            const listDaoObj = new listDao();
            const postgreeStubQuery = sinon.stub(pgPool.prototype, 'query');
            sinon.stub(listDao.prototype, "getListById").returns(0);

            const returnedUser = await listDaoObj.delete(id);

            expect(postgreeStubQuery.calledWith("DELETE FROM todolists WHERE id =" + id)).to.equal(true);
            expect(returnedUser).to.equal("List deleted successfully");
        });

        it("should not run delete query when given id does not exist", async function () {
            const id = 1;
            const listDaoObj = new listDao();
            sinon.stub(listDao.prototype, "getListById").returns(undefined);

            const returnedUser = await listDaoObj.delete(id);

            expect(returnedUser).to.equal(-1);
        });
    });

    describe("Edit list unit tests", function () {

        it("should edit list when proper name is given and the list id exists", async function () {
            const id = 1;
            const name = "Code";
            const listDaoObj = new listDao();
            const postgreeStubQuery = sinon.stub(pgPool.prototype, 'query');
            sinon.stub(listDao.prototype, "getListById").returns(0);
            const list = new List.ToDoList(id, name);

            const returnedUser = await listDaoObj.edit(list);

            expect(postgreeStubQuery.calledWith("UPDATE todolists SET  name='" + name + "' where id=" + id)).to.equal(true);
            expect(returnedUser).to.equal("Task edited!");
        });

        it("should not edit list when id does not exist", async function () {
            const id = 1;
            const name = "Coding";
            const list = new List.ToDoList(id, name);
            const listDaoObj = new listDao();
            sinon.stub(listDao.prototype, "getListById").returns(undefined);

            const returnedUser = await listDaoObj.edit(list);

            expect(returnedUser).to.equal("NA");
        });

        it("should not edit list when name is empty", async function () {
            const id = 1;
            const name = "";
            const list = new List.ToDoList(id, name);
            const listDaoObj = new listDao();
            sinon.stub(listDao.prototype, "getListById").returns(undefined);

            const returnedUser = await listDaoObj.edit(list);

            expect(returnedUser).to.equal("Empty");
        });
    });

    describe("Get list unit tests", function () {

        it("should give list when id is given", async function () {
            const id = 1;
            const listDaoObj = new listDao();
            const postgreeStubQuery = sinon.stub(pgPool.prototype, 'query').returns({ rows: [{ "id": 1, "name": "Code" }] });

            const returnedUser = await listDaoObj.getListById(id);

            expect(postgreeStubQuery.calledWith("SELECT * from todolists where id=" + id)).to.equal(true);
            expect(returnedUser).to.be.a('Object');
        });

        it("should give all lists when number of lists is greater than zero", async function () {
            const listDaoObj = new listDao();
            const postgreeStubQuery = sinon.stub(pgPool.prototype, 'query').returns({ rows: [{ "id": 1, "name": "Code" }] });

            const returnedUser = await listDaoObj.getAllList();

            expect(postgreeStubQuery.calledWith("SELECT * from todolists")).to.equal(true);
            expect(returnedUser).to.be.a('array');
        });

        it("should give proper message when no list is present", async function () {
            const listDaoObj = new listDao();
            const postgreeStubQuery = sinon.stub(pgPool.prototype, 'query').returns({ rows: [] });

            const returnedUser = await listDaoObj.getAllList();

            expect(postgreeStubQuery.calledWith("SELECT * from todolists")).to.equal(true);
            expect(returnedUser).to.equal("No list to show");
        });

    });

});