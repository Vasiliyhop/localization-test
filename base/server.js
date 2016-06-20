var express = require('express'),
    path = require('path'),
    logger = require('../libs/logger'),
    routes = require('./routes'),
    config = require('./config'),
    db = require('./mongoose'),
    app = express();

app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(function (err, req, res, next) {
  logger.log(err, req, res, next);
  console.log(err.name);
  if (err.name === 'ValidationError') {
    res.send(400, err);
  } else {
    next(err);
  }
})

app.use(function (err, req, res, next) {
  res.send(500, err);
});

var handlers = {
  app: require('../handlers/app'),
  user: require('../handlers/user')
}

function run() {
  routes.setup(app, handlers);
  db.init(path.join(__dirname, '../models'), function (err, data) {
    app.listen(config.get('port'), function () {
      console.log('App running on port:' + config.get('port'));
      logger.info('App running on port:' + config.get('port'));
    });
  });
}

module.exports.run = run;
run();

