const { format } = require('url');
const { address } = require('ip');

const hostname = 'localhost';
const port = process.env.PORT || 8080;

module.exports = function (opts) {
	opts = Object.assign({ hostname, port, https:false }, opts);
	opts.protocol = opts.https ? 'https' : 'http';
	const local = format(opts);
	opts.hostname = address(); // network ip
	const network = format(opts);
	return { local, network };
}
