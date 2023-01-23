"use strict";
exports.__esModule = true;
exports.ToDoList = void 0;
var ToDoList = /** @class */ (function () {
    function ToDoList(id, name) {
        this.id = id;
        this.name = name;
    }
    ToDoList.prototype.setName = function (name) {
        this.name = name;
    };
    ToDoList.prototype.getId = function () {
        return this.id;
    };
    ToDoList.prototype.getName = function () {
        return this.name;
    };
    return ToDoList;
}());
exports.ToDoList = ToDoList;
