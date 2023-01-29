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
exports.listDao = void 0;
var db_config_1 = require("../db.config/db.config");
var logger_1 = require("../Logger/logger");
var listDao = /** @class */ (function () {
    function listDao() {
    }
    listDao.prototype.create = function (listObj) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (listObj.getName() == undefined || listObj.getName().trim() == "")
                            return [2 /*return*/, "Empty"];
                        return [4 /*yield*/, this.findListByName(listObj.getName())];
                    case 1:
                        if ((_a.sent()) == -1)
                            return [2 /*return*/, "Duplicate"];
                        return [4 /*yield*/, this.getListById(listObj.getId())];
                    case 2:
                        if ((_a.sent()) != undefined) {
                            return [2 /*return*/, "Duplicate id"];
                        }
                        query = "INSERT INTO todolists values(" + listObj.getId() + ",'" + listObj.getName() + "')";
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, "List added: " + listObj.getId() + " " + listObj.getName()];
                }
            });
        });
    };
    listDao.prototype["delete"] = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var listItem, query, queryTodo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getListById(id)];
                    case 1:
                        listItem = _a.sent();
                        if (listItem == undefined)
                            return [2 /*return*/, -1];
                        query = "DELETE FROM todolists WHERE id =" + id;
                        queryTodo = "DELETE FROM todotask WHERE list_id =" + id;
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(queryTodo)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, "List deleted successfully"];
                }
            });
        });
    };
    listDao.prototype.edit = function (listObj) {
        return __awaiter(this, void 0, void 0, function () {
            var query;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (listObj.getName() == undefined || listObj.getName().trim() == "")
                            return [2 /*return*/, "Empty"];
                        return [4 /*yield*/, this.getListById(listObj.getId())];
                    case 1:
                        if ((_a.sent()) == undefined)
                            return [2 /*return*/, "NA"];
                        query = "UPDATE todolists SET  name='" + listObj.getName() + "' where id=" + listObj.getId();
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, "Task edited!"];
                }
            });
        });
    };
    listDao.prototype.getListById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var query, now, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * from todolists where id=" + id;
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 1:
                        now = _a.sent();
                        arr = now.rows[0];
                        return [2 /*return*/, arr];
                }
            });
        });
    };
    listDao.prototype.getAllList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var query, now, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * from todolists";
                        logger_1.logger.info(query);
                        return [4 /*yield*/, db_config_1.pool.query(query)];
                    case 1:
                        now = _a.sent();
                        arr = now.rows;
                        if (arr.length == 0)
                            return [2 /*return*/, "No list to show"];
                        return [2 /*return*/, arr];
                }
            });
        });
    };
    listDao.prototype.findListByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var query, now, arr;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        query = "SELECT * from todolists where name= '" + name + "'";
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
    return listDao;
}());
exports.listDao = listDao;
