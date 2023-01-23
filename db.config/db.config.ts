const {Pool}=require('pg');
export var pool;

// export const =new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "postgres",
//     password: "Srashti2604@",
//     port: 5432,
// })

if(process.env.NODE_ENV == 'test'){
pool=new Pool({
        user: "postgres",
        host: "localhost",
        database: "testdb",
        password: "Srashti2604@",
        port: 5432,
    })
}

else{
    pool=new Pool({
            user: "postgres",
            host: "localhost",
            database: "postgres",
            password: "Srashti2604@",
            port: 5432,
        })
}