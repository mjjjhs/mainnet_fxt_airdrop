const woodlotCustomLogger = require('woodlot').customLogger;

module.exports = logFile => new woodlotCustomLogger({
	// streams: ['/dev/null'],
	streams: [`./log/${logFile}`],
	stdout: true,
	format: {
		type: 'text'
	}
})
