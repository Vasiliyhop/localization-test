
var executor = require('./libs/executor'),
	exit = require('./libs/exit'),
	commands = {
		serverStart: 'node ./base/server.js --logpath ../logs/server.log',
		mongoStart: 'mongod --fork --dbpath '+__dirname+'/data/ --logpath '+__dirname+'/logs/mongo.log',
		mongoStop: 'mongo admin --eval "db.shutdownServer();"'
	};
(function() {
	var killer;
	executor(commands.mongoStart, 'mongoDB database', function(){
		executor(commands.serverStart, 'server', function(forKilling){
			killer = forKilling
		});
	});
	exit.exit(function(){
		executor(commands.mongoStop, 'mongoDB database', function(){
			if (killer) {
				killer();
			}
			process.exit();
		});
	});
})()
//curl --data-urlencode "name=vasa" http://localhost:1337/rest/user