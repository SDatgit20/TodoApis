"use strict";
exports.__esModule = true;
exports.ToDoTask = void 0;
var ToDoTask = /** @class */ (function () {
    function ToDoTask(description, list_id) {
        this.status = "Pending";
        this.description = description;
        this.list_id = list_id;
    }
    ToDoTask.prototype.setDescription = function (description) {
        this.description = description;
    };
    ToDoTask.prototype.setStatus = function (status) {
        this.status = status;
    };
    ToDoTask.prototype.getId = function () {
        return this.id;
    };
    ToDoTask.prototype.getDescription = function () {
        return this.description;
    };
    ToDoTask.prototype.getStatus = function () {
        return this.status;
    };
    ToDoTask.prototype.getlistId = function () {
        return this.list_id;
    };
    return ToDoTask;
}());
exports.ToDoTask = ToDoTask;
