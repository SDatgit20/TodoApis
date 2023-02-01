import todoListRoutes from './Routes/todoList.routes';
import todoTaskRoutes from './Routes/todoTask.routes';

//* Here I defined the first endpoint
const router = (app) => {
    app.use('/to-do-list', todoListRoutes);
    app.use('/to-do-list', todoTaskRoutes);
};

export default router;