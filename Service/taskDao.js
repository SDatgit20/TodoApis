"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.taskDao = void 0;
var db_config_1 = require("../db.config/db.config");
var logger_1 = require("../Logger/logger");
var taskDao = /** @class */ (function () {
    function taskDao() {
    }
    taskDao.prototype.createTodo = function (todoObj) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (todoObj.getDescription() == undefined || todoObj.getDescription() == "")
                            return [2 /*return*/, "Description empty"];
                        return [4 /*yield*/, this.findTaskByName(todoObj.getDescription(), todoObj.getlistId())];
                    case 1:
                        if ((_a.sent()) == -1)
                            return [2 /*return*/, "Duplicate"];
                        query = "INSERT INTO todotask (list_id,description,status) values(" + todoObj.getlistId() + ",'" + todoObj.getDescription() + "','" + todoObj.getStatus() + "')";
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, "Task added: " + todoObj.getId() + " " + todoObj.getDescription()];
                }
            });
        });
    };
    taskDao.prototype.deleteTodo = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "DELETE FROM todotask WHERE todo_id =" + id;
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, "Task deleted successfully"];
                }
            });
        });
    };
    taskDao.prototype.editTodo = function (id, description) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (description == undefined || description.trim() == "")
                            return [2 /*return*/, "Description empty"];
                        query = "UPDATE todotask SET  description='" + description + "' where todo_id=" + id;
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, "Task edited"];
                }
            });
        });
    };
    taskDao.prototype.changeStatus = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, now;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "UPDATE todotask SET  status= case status when 'Pending' then 'Completed' when 'Completed' then 'Pending' end" + " where todo_id=" + id;
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 1:
                        now = _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    taskDao.prototype.getAllPendingTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, now, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * from todotask where status like 'Pending'";
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 1:
                        now = _a.sent();
                        arr = now.rows;
                        return [2 /*return*/, arr];
                }
            });
        });
    };
    taskDao.prototype.getAllCompletedTasks = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, now, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * from todotask where status like 'Completed' ";
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 1:
                        now = _a.sent();
                        arr = now.rows;
                        return [2 /*return*/, arr];
                }
            });
        });
    };
    taskDao.prototype.getTodoById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, now, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * from todotask" + " where todo_id=" + id;
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 1:
                        now = _a.sent();
                        arr = now.rows;
                        return [2 /*return*/, arr];
                }
            });
        });
    };
    taskDao.prototype.getTodoByListId = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, now, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * from todotask" + " where list_id=" + id;
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 1:
                        now = _a.sent();
                        arr = now.rows;
                        return [2 /*return*/, arr];
                }
            });
        });
    };
    taskDao.prototype.findTaskByName = function (name, id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, now, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * from todotask where description= '" + name + "' and list_id=" + id;
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 1:
                        now = _a.sent();
                        arr = now.rows;
                        if (arr.length > 0)
                            return [2 /*return*/, -1];
                        return [2 /*return*/, 0];
                }
            });
        });
    };
    return taskDao;
}());
exports.taskDao = taskDao;
