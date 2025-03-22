const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:root@localhost:5432/Roxiler_RatingWebApp_Database",
});

module.exports = pool;
