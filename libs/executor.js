module.exports = function(command, description, cb) {
	const exec = require('child_process').exec;

	var child = exec(command),
		killer = function() {
			child.stdin.pause();
			child.kill('SIGINT');
		};

	child.stdout.once('data', function(data) {
	    console.log(description + ' run : ' + data);
	    cb(killer);
	});
	child.stderr.once('data', function(data) {
	    console.log(description + ' error : ' + data);
	});
	child.stdin.once('pause', function(data) {
	    console.log(description + ' stopped ');
	});
	child.once('close', function(code) {
	    console.log(description + ' closing code: ' + code);
	});
}