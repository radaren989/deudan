const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "tugrul",
    host: "localhost",
    port: 5432,
    database: "deudan",
});

module.exports = pool;
