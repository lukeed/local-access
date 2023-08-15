import {URL} from 'node:url'
import {networkInterfaces} from 'node:os'

const port = process.env.PORT ?? 8080
const isLAN = x => x.family === 'IPv4' && !x.internal

function format(url, opts) {
	for (const [prop, value] of Object.entries(opts)) {
		url[prop] = value
	}
	return url.toString()
}

function local(_opts) {
	const opts = {
		hostname: 'localhost',
		port,
		protocol: 'http',
		..._opts
	}

	const url = new URL('http://localhost')
	const local = format(url, opts)

	let nets = networkInterfaces()
	for (let [, props] of Object.entries(nets)) {
		const tmp = props.find(isLAN)
		if (tmp) {
			opts.hostname = tmp.address
			break
		}
	}

	return {
		local,
		network: format(url, opts)
	}
}

export default local
