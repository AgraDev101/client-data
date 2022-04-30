const Pool = require("pg").Pool;
require('dotenv').config()

const pool2 = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: process.env.HOST,
    port: 5432,
    database: process.env.DATABASE
})

// module.exports = pool
module.exports = pool2;
