var express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    methodOverride = require('method-override'),
    logger = require('../libs/logger'),
    routes = require('./routes'),
    config = require('./config'),
    db = require('./mongoose'),
    app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride());
app.use(function (err, req, res, next) {
  logger.log(err.name);
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
      logger.info('App running on port:' + config.get('port'));
    });
  });
}

module.exports.run = run;
run();

