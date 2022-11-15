const {Client} = require('pg');
// require pg from 'postgres'
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

const getAllMeds = (req, res) => {
  client.query(`
  SELECT * FROM "Medications"
`)
.then((data) => {
console.log(data.rows)
res.send(data.rows)
})
.catch((err) => {
console.log(err)
res.end()
})
}

const getMedication = (medName, dose) => {
  client.query(`
    SELECT * FROM "Medications"
      WHERE medicationName = '${medName}'
  `)
  .then((data) => {
    return data.rows
  })
}

const getUserMeds = (req, res) => {
  client.query(`
    SELECT * FROM "UsersMedications"
      WHERE user_id = ${req.body.user_id}
`)
.then((data) => {
  console.log(data.rows)
  res.send(data.rows)
})
.catch((err) => {
  console.log('User not created:', err)
  res.end()
})
}

const createUser = (req, res) => {
  client.query(`
    INSERT INTO "Users" (user_name, "user_hashedPW", "user_cellNumber")
      VALUES ('${req.body.name}', '${req.body.password}', ${req.body.cell})
  `)
  .then(() => {
    console.log('User Created')
    res.end()
  })
  .catch((err) => {
    console.log('User not created:', err)
    res.end()
  })
}

const createMedication = (medicine) => {
  return (client.query(`
    INSERT INTO "Medications" (medication_name)
      VALUES ('${medicine}')
      RETURNING medication_id
  `))
}

const createUserMedication = (notificationTime, user_id, medication_id) => {
  console.log(notificationTime, user_id, medication_id)
  client.query(`
    INSERT INTO "UsersMedications" (user_id, medication_id, "notificationTime")
      VALUES (${user_id}, ${medication_id}, '${notificationTime}')
  `)
  .then(() => {
    console.log('Med Created')
  })
  .catch((err) => {
    console.log('Med not created:', err)
  })
}

const deleteUserMedicine = (req,res) => {
  client.query(`
    DELETE FROM "UsersMedications"
      WHERE usersMedications_id = '${req.body.usersMedications_id}'
  `)
  .then(() => {
    console.log('Med Deleted')
    res.end()
  })
  .catch((err) => {
    console.log('Med not Deleted:', err)
    res.end()
  })
}

module.exports = { client, createUser, createUserMedication, deleteUserMedicine, getAllMeds, getMedication, createMedication, getUserMeds}