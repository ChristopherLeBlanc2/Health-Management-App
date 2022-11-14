const {Client} = require('pg');
require('dotenv').config();

const client = new Client({
  host: process.env.URL,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  PORT: process.env.PORT
});

client.connect()

.then(() => {
  console.log('connected')
})
.catch(err => {
  console.log(err)
})

module.exports = {client }