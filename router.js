"use strict";
exports.__esModule = true;
var todoList_routes_1 = require("./Routes/todoList.routes");
var todoTask_routes_1 = require("./Routes/todoTask.routes");
//* Here I defined the first endpoint
var router = function (app) {
    app.use('/to-do-list', todoList_routes_1["default"]);
    app.use('/to-do-list', todoTask_routes_1["default"]);
};
exports["default"] = router;
