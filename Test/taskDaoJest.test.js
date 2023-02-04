// const Todo = require("../Model/todoTask");
// const pgPool = require('pg-pool');
// const { taskDao } = require("../Service/taskDao");

// describe('Add Todo Test', () => {
//     test('Should successfully add a todo', async () => {
//         const id = 1;
//         const listid = 1;
//         const description = 'Code';
//         const todo = new Todo.ToDoTask(listid, description);
//         const postgreeStubQuery = jest.spyOn(pgPool.prototype, 'query');
//         const todoDaoObj = new taskDao;

//         // Provide a custom implementation for the stubbed method
//         postgreeStubQuery.mockImplementation(() => {
//             return Promise.resolve('Query executed successfully');
//         });

//         // Call the stubbed method
//         const result = await pgPool.prototype.query();

//         // Check if the custom implementation was called
//         expect(result).toBe('Query executed successfully');
//         // jest.spyOn(taskDao.prototype, 'findTaskByName').mockReturnValue(0);
//         // jest.spyOn(Todo.ToDoTask.prototype, 'getId').mockReturnValue(id);
//         // jest.spyOn(Todo.ToDoTask.prototype, 'getlistId').mockReturnValue(listid);
//         // jest.spyOn(Todo.ToDoTask.prototype, 'getDescription').mockReturnValue(description);

//         // const returnedUser = await todoDaoObj.createTodo(todo);

//         expect(result).toHaveBeenCalledWith("INSERT INTO todotask (list_id,description,status) values(1,'Code','Pending')");
//         // expect(returnedUser).toBe('Task added: 1 Code');
//     });
// });