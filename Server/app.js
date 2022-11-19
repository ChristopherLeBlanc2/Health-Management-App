require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const db = require('./db.js')
const jwt = require('jsonwebtoken');
const cors = require('cors');



var app = express();

const allowedOrigins = [
  'http://localhost:5173',
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  }),
);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const authenticateToken = (req, res, next) => {
  const cookieHeader = req.headers.cookie;
  const token = cookieHeader?.split('=')[1];

  if (!token) {
    return res.sendStatus(401);
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, tokenInfo) => {
    if (err) {
      res.sendStatus(403);
    } else {
      req.body.user_id = tokenInfo.userId;
      next();
    }
  });
  return undefined;
};


app.get('/getUser', authenticateToken, db.getUser)

app.get('/getAllMeds', authenticateToken, db.getAllMeds)

app.get('/getUserMeds', authenticateToken, db.getUserMeds)

app.post('/userLogIn', db.logIn)

app.post('/addUser', db.createUser)


app.post("/addUserMedication", authenticateToken, async function (req, res) {
  // const rows = await db.getMedication(req.body.medName);
  let medicineId = req.body.medicine

  if (typeof req.body.medicine === 'string') {
    const result = await db.createMedication(req.body.medicine);
    medicineId = result.rows[0].medication_id
  }

  await db.createUserMedication(
    req.body.notificationTime,
    req.body.user_id,
    medicineId
  );
  res.end()
});

app.delete('/deleteUserMedicine', authenticateToken, db.deleteUserMedicine)

// app.put('/changeMedication', db.changeMedication)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  console.log(req)
  next(createError(404));
});

module.exports = app;
