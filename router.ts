import todoListRoutes from './Routes/todoList.routes';

//* Here I defined the first endpoint
const router = (app) => {
    app.use('/todolist', todoListRoutes);
};

export default router;