const { Pool } = require('pg')

const pool = new Pool({
  connectionString: process.env.CONN_STRING
  // connectionString: "postgres://default:ce8pYLvS9HRU@ep-morning-unit-351736-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb?sslmode=require",
})
pool.connect(function(err){
    if (err) {
      console.log("Database connection error");
      console.log(err)
    }else
    {
      console.log("Database connected successfully");
    }
  })

module.exports = pool;
