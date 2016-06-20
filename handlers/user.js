var mongoose = require('../base/mongoose');

var modelName = 'user';

var handlers = require('../base/crud')(modelName);

module.exports = handlers;
