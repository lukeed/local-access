const { URL } = require('url');
const { networkInterfaces } = require('os');

const port = process.env.PORT || 8080;
const isLAN = x => x.family === 'IPv4' && !x.internal;

function format(url, opts) {
	for (let [prop, value] of Object.entries(opts)) {
		url[prop] = value;
	}
	return url.toString();
}

module.exports = function (opts) {
	opts = { hostname: 'localhost', port, protocol: 'http', ...opts };

	let url = new URL('http://localhost');
	let local = format(url, opts);

	let tmp;
	let nets = networkInterfaces();
	for (let [, props] of Object.entries(nets)) {
		if (tmp = props.find(isLAN)) {
			opts.hostname = tmp.address; // network IP
			break;
		}
	}

	return { local, network: format(url, opts) };
}
