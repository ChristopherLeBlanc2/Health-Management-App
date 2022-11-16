require("dotenv").config();
var createError = require('http-errors');
var express = require('express');
var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
const db = require('./db.js')

var app = express();

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

app.get('/getUser', db.getUser)

app.get('/getAllMeds', db.getAllMeds)

app.get('/getUserMeds', db.getUserMeds)

app.post('/addUser', db.createUser)

app.post("/addUserMedication", async function (req, res) {
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

app.delete('/deleteUserMedicine', db.deleteUserMedicine)

// app.put('/changeMedication', db.changeMedication)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

module.exports = app;
