var index = function(req, res) {
		res.sendfile('app/index.html')
	};

var files = function (req, res) {
		res.sendfile(req.originalUrl.substr(1)); 
	};

module.exports = {
	index: index,
	files: files
};
