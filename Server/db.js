const {Client} = require('pg');
// require pg from 'postgres'
require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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

const generateAccessToken = user => {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30m' });
};

const getUser = (req, res) => {
  client.query(`
    SELECT * FROM "Users"
    WHERE user_id = ${req.body.user_id}
  `)
  .then((data) => {
    console.log(data.rows)
    res.send(data.rows[0])
  })
  .catch((err) => {
    console.log(err)
    res.end()
  })
}

const getAllMeds = (req, res) => {
  client.query(`
    SELECT * FROM "Medications"
  `)
  .then((data) => {
    console.log(data.rows)
    res.json(data.rows)
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
  console.log(req.body)
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

const logIn = async (req, res) => {
  try {
    const results = await client.query(`SELECT "user_hashedPW" FROM "Users" WHERE user_name = '${req.body.username}'`)
    console.log(results)
    const doesMatch = await bcrypt.compare(req.body.password, results.rows[0].user_hashedPW)
    if (doesMatch) {
      const result = await client.query(`
      SELECT * FROM "Users"
      WHERE user_name = '${req.body.username}'
      `)
      const accessToken = generateAccessToken({ userId: result.rows[0].user_id });
      console.log(accessToken)
      res.json({token: accessToken})
    }
    throw new Error()
  } catch (err) {
    console.log(err)
    res.end()
  }
};



const createUser = async (req, res) => {
  try {
    const saltRounds = 10;
    const hash = await bcrypt.hash(req.body.password, saltRounds)
    await client.query(`
      INSERT INTO "Users" (user_name, "user_hashedPW", "user_cellNumber")
        VALUES ('${req.body.userName}', '${hash}', ${req.body.cell})
    `)
    console.log('User Created')
    const result = await client.query(`
      SELECT * FROM "Users"
      WHERE user_name = '${req.body.name}'
    `)
    const accessToken = generateAccessToken({ userId: result.rows[0].user_id });
    console.log(accessToken)
    res.send(accessToken)
  } catch (err) {
    console.log(err)
    res.end()
  }
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

const deleteUserMedicine = (req, res) => {
  client.query(`
    DELETE FROM "UsersMedications"
      WHERE "usersMedications_id" = '${req.body.usersMedications_id}'
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

module.exports = { client, createUser, createUserMedication, deleteUserMedicine, getAllMeds, getMedication, createMedication, getUserMeds, getUser, logIn }