var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('market', 'arjun', '123456789a#', {
  host: 'localhost',
  dialect: 'mysql'
});

const User = sequelize.define("users", {
  username: DataTypes.TEXT,
  password: DataTypes.TEXT
});

(async () => {
  await sequelize.sync({ force: true });
  // Code here
})();

const db = require("./database");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.post("/post", (req, res) => {
  const {username, password} = req.body;
  if(username && password){
    try {
      //db.promise().query(`INSERT INTO users VALUES('${username}', '${password}')`);
      User.create({ username, password });

      res.status(201).send({ msg: "Created user for sequelize."});
    } catch (error) {
      console.log("error is ", error);
    }
  }
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.listen(8002);

module.exports = app;
