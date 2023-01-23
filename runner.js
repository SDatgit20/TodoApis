"use strict";
exports.__esModule = true;
var _1 = require(".");
var Controller_1 = require("./Controller/Controller");
var taskController_1 = require("./Controller/taskController");
(0, Controller_1.Controller)(_1.app);
(0, taskController_1.TaskController)(_1.app);
