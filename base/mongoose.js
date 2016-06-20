var mongoose = require('mongoose');
var fs = require('fs');
var path = require('path');
var async = require('async');
var config = require('./config');

mongoose.connect(config.get('mongoose:uri'));
var db = mongoose.connection;

db.on('error', function (err) {
  
});
db.once('open', function callback() {
  
});

var models = {};

var init = function (modelsDirectory, callback) {
  var schemaList = fs.readdirSync(modelsDirectory);
  async.each(schemaList, function (item, cb) {
    var modelName = path.basename(item, '.js');
    models[modelName] = require(path.join(modelsDirectory, modelName))(mongoose);
    cb();
  }, callback);
};

var model = function (modelName) {
  var name = modelName.toLowerCase();
  if (typeof models[name] == "undefined") {
    throw "Model '" + name + "' is not exist";
  }
  return models[name];
};

var exit = function() {
  mongoose.disconnect();
};

module.exports.init = init;
module.exports.model = model;
module.exports.exit = exit;