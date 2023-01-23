"use strict";
exports.__esModule = true;
exports.app = void 0;
var express = require('express');
exports.app = express();
var port = 3000;
exports.app.use(express.json());
exports.app.use(express.urlencoded({ extended: true }));
exports.app.get('/', function (req, res) {
    res.send('Hello World!');
});
exports.app.listen(port, function () {
    console.log("Example app listening at http://localhost:".concat(port));
});
