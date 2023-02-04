const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const { listDao } = require('../Service/listDao');
const { getTodoListById, getAllTodoLists, createNewTodoList, updateTodoList, deleteTodoListById } = require('../Controller/Controller');


describe('List Controller tests', () => {

    beforeEach(() => {
        res = {
            send: sinon.spy(),
            status: sinon.stub().returns({
                send: sinon.spy()
            })
        };
    });
    afterEach(() => {
        sinon.restore();
    });
    describe('Test getAllList and getListById', () => {
        it('should send all lists as a JSON string', () => {
            const allLists = [
                { id: 1, name: 'list 1' },
                { id: 2, name: 'list 2' }
            ];
            sinon.stub(listDao.prototype, 'getAllList').resolves(allLists);
            const req = {};

            getAllTodoLists(req, res);

            return new Promise(resolve => {
                setTimeout(() => {
                    expect(listDao.prototype.getAllList.calledOnce).to.be.true;
                    expect(res.send.calledOnce).to.be.true;
                    expect(res.status.firstCall.args[0]).to.equal(200);
                    expect(res.status.called).to.be.true;
                    expect(res.send.firstCall.args[0]).to.equal(JSON.stringify(allLists));
                    resolve();
                }, 0);
            });
        });

        it('should send list by id as a JSON string', () => {
            const list = { id: 1, name: 'list 1' };
            sinon.stub(listDao.prototype, 'getListById').resolves(list);
            const req = {
                params:
                    { listid: 1 }
            };

            getTodoListById(req, res);

            return new Promise(resolve => {
                setTimeout(() => {
                    expect(res.status.firstCall.args[0]).to.equal(200);
                    expect(res.send.firstCall.args[0]).to.equal(JSON.stringify(list));
                    resolve();
                }, 0);
            });
        });
    });

    describe('Test create new list', () => {
        it('should return a 404 status code and a message when the list is not found', async () => {
            sinon.stub(listDao.prototype, 'getListById').resolves(undefined);
            const req = {
                params:
                    { listid: 1 }
            };

            getTodoListById(req, res);

            return new Promise(resolve => {
                setTimeout(() => {
                    expect(res.status.firstCall.args[0]).to.equal(404);
                    expect(res.status.called).to.be.true;
                    expect(res.send.firstCall.args[0]).to.equal("List not found for given id");
                    resolve();
                }, 0);
            });
        });

        it('should not create a new list when name is empty', async () => {
            sinon.stub(listDao.prototype, 'create').resolves("Empty");
            const req = {
                body:
                {
                    id: 1,
                    name: "hello"
                }
            };

            createNewTodoList(req, res);

            return new Promise(resolve => {
                setTimeout(() => {
                    expect(res.status.firstCall.args[0]).to.equal(400);
                    expect(res.status.called).to.be.true;
                    expect(res.send.firstCall.args[0]).to.equal("Name cannot be empty");
                    resolve();
                }, 0);
            });
        });

        it('should not create a new list when name already exists in the list', async () => {
            sinon.stub(listDao.prototype, 'create').resolves("Duplicate");
            const req = {
                body:
                {
                    id: 1,
                    name: "hello"
                }
            };

            createNewTodoList(req, res);

            return new Promise(resolve => {
                setTimeout(() => {
                    expect(res.status.firstCall.args[0]).to.equal(400);
                    expect(res.status.called).to.be.true;
                    expect(res.send.firstCall.args[0]).to.equal("Name" + req.body.name + "already exists");
                    resolve();
                }, 0);
            });
        });

        it('should not create a new list when id already exists', async () => {
            sinon.stub(listDao.prototype, 'create').resolves("Duplicate id");
            const req = {
                body:
                {
                    id: 1,
                    name: "hello"
                }
            };

            createNewTodoList(req, res);

            return new Promise(resolve => {
                setTimeout(() => {
                    expect(res.status.firstCall.args[0]).to.equal(400);
                    expect(res.status.called).to.be.true;
                    expect(res.send.firstCall.args[0]).to.equal("Id" + req.body.id + "already exists");
                    resolve();
                }, 0);
            });
        });

        it('should create a new list when name is not empty', async () => {
            sinon.stub(listDao.prototype, 'create').resolves("List created");
            const req = {
                body:
                {
                    id: 1,
                    name: "hello"
                }
            };

            createNewTodoList(req, res);

            return new Promise(resolve => {
                setTimeout(() => {
                    expect(res.status.firstCall.args[0]).to.equal(201);
                    expect(res.status.called).to.be.true;
                    expect(res.send.firstCall.args[0]).to.equal("List created");
                    resolve();
                }, 0);
            });
        });
    });
    describe('Test edit list', () => {
        it('should edit a list when name is not empty', async () => {
            sinon.stub(listDao.prototype, 'edit').resolves("List edited");
            const req = {
                body:
                {
                    id: 1,
                    name: "hello"
                }
            };

            updateTodoList(req, res);

            return new Promise(resolve => {
                setTimeout(() => {
                    expect(res.send.firstCall.args[0]).to.equal("List edited");
                    resolve();
                }, 0);
            });
        });

        it('should not edit a list when name is empty', async () => {
            sinon.stub(listDao.prototype, 'edit').resolves("Empty");
            const req = {
                body:
                {
                    id: 1,
                    name: "hello"
                }
            };

            updateTodoList(req, res);

            return new Promise(resolve => {
                setTimeout(() => {
                    expect(res.status.firstCall.args[0]).to.equal(400);
                    expect(res.status.called).to.be.true;
                    expect(res.send.firstCall.args[0]).to.equal("Name cannot be empty");
                    resolve();
                }, 0);
            });
        });

        it('should not edit a list when list id is not found', async () => {
            sinon.stub(listDao.prototype, 'edit').resolves("NA");
            const req = {
                body:
                {
                    id: 1,
                    name: "hello"
                }
            };

            updateTodoList(req, res);

            return new Promise(resolve => {
                setTimeout(() => {
                    expect(res.status.firstCall.args[0]).to.equal(400);
                    expect(res.status.called).to.be.true;
                    expect(res.send.firstCall.args[0]).to.equal("List with given id" + req.body.id + " not exist");
                    resolve();
                }, 0);
            });
        });
    });

    describe('Test delete list', () => {
        it('should not delete a list when list id is not found', async () => {
            sinon.stub(listDao.prototype, 'delete').resolves(-1);
            const req = {
                params:
                    { listid: 1 }
            };

            deleteTodoListById(req, res);

            return new Promise(resolve => {
                setTimeout(() => {
                    expect(res.status.firstCall.args[0]).to.equal(404);
                    expect(res.status.called).to.be.true;
                    expect(res.send.firstCall.args[0]).to.equal("List not found for given id");
                    resolve();
                }, 0);
            });
        });

        it('should delete a list when list id is present', async () => {
            sinon.stub(listDao.prototype, 'delete').resolves("List deleted");
            const req = {
                params:
                    { listid: 1 }
            };

            deleteTodoListById(req, res);

            return new Promise(resolve => {
                setTimeout(() => {
                    expect(res.send.firstCall.args[0]).to.equal("List deleted");
                    resolve();
                }, 0);
            });
        });
    });
});






