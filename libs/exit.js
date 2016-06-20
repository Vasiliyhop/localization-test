//killall -9 node
//killall -9 mongod
module.exports = {
  exit: function(cb) {
    const exec = require('child_process').exec;
    var keypress = require('keypress');

    keypress(process.stdin);

    process.stdin.on('keypress', function (ch, key) {
      if (key && key.ctrl) {
        if (key.name === 'c' ||
            key.name === 'z') {
            cb();
        }
      }
    });

    process.stdin.setRawMode(true);
    process.stdin.resume();
  }
};