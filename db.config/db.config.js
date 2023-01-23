"use strict";
exports.__esModule = true;
exports.pool = void 0;
var Pool = require('pg').Pool;
// export const =new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "postgres",
//     password: "Srashti2604@",
//     port: 5432,
// })
if (process.env.NODE_ENV == 'test') {
    exports.pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "testdb",
        password: "Srashti2604@",
        port: 5432
    });
}
else {
    exports.pool = new Pool({
        user: "postgres",
        host: "localhost",
        database: "postgres",
        password: "Srashti2604@",
        port: 5432
    });
}
