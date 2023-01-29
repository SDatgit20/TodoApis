import todoListRoutes from './Routes/todoList.routes';
import todoTaskRoutes from './Routes/todoTask.routes';

//* Here I defined the first endpoint
const router = (app) => {
    app.use('/todolist', todoListRoutes);
    app.use('/todolist', todoTaskRoutes);
};

export default router;