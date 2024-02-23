var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var Docker = require('dockerode');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
const http = require('http');

// Docker API endpoint
const options = {
  socketPath: '/var/run/docker.sock', // Path to Docker daemon socket
  path: '/containers/json', // API endpoint to list containers
  method: 'GET',
};

// Make HTTP request to Docker API
const req = http.request(options, (res) => {
  let data = '';

  res.on('data', (chunk) => {
    data += chunk;
  });

  res.on('end', () => {
    const containers = JSON.parse(data);
    if (containers && containers.length > 0) {
      // console.log(containers[0].Ports)
      console.log(containers[0])
      const containerId = containers[0].Id; // Get the ID of the first container
      console.log(`Container ID: ${containerId}`);
    } else {
      console.log('No containers found.');
    }
  });
});

req.on('error', (error) => {
  console.error(`Error: ${error}`);
});

req.end();


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

const PORT = 3002
app.listen(PORT, () =>{
  console.log('Process env', process.env.HOST_NAME_XYZ)
  console.log(`App started running on ${PORT}`)
})

module.exports = app;
