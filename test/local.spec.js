import {test} from 'uvu'
import * as assert from 'uvu/assert'
import laccess from '../src/local.js'

test('local-access', () => {
	assert.type(laccess, 'function', 'exports a function')
})

test('local-access (returns)', () => {
	const out = laccess()
	assert.instance(out, Object, 'returns an object')

	assert.ok(out.local !== void 0, 'contains a `local` key')
	assert.type(out.local, 'string', 'returns `local` as `string` type')

	assert.ok(out.network !== void 0, 'contains a `network` key')
	assert.type(out.network, 'string', 'returns `network` as `string` type')
})

test('local-access (defaults)', () => {
	const out = laccess()
	assert.is(out.local, 'http://localhost:8080/', 'returns `local` as expected')
	assert.match(out.network, 'http://', 'returns `network` with expected protocol')
	assert.match(out.network, '8080', 'returns `network` with expected port')
})

test('local-access ({ pathname })', () => {
	const out = laccess({ pathname: '/foo/bar' })
	assert.is(out.local, 'http://localhost:8080/foo/bar', 'returns `local` as expected')
	assert.match(out.network, 'http://', 'returns `network` with expected protocol')
	assert.match(out.network, '8080', 'returns `network` with expected port')
})

test('local-access ({ protocol: https })', () => {
	const out = laccess({ protocol:'https' })
	assert.match(out.local, 'https://', 'returns `local` with `https` protocol')
	assert.match(out.network, 'https://', 'returns `network` with `https` protocol')
})

test('local-access ({ protocol: wss })', () => {
	const out = laccess({ protocol:'wss' })
	assert.match(out.local, 'wss://', 'returns `local` with `wss` protocol')
	assert.match(out.network, 'wss://', 'returns `network` with `wss` protocol')
})

test('local-access ({ port })', () => {
	const out = laccess({ port: 3000 })
	assert.match(out.local, ':3000', 'returns `local` with custom `port`')
	assert.match(out.network, ':3000', 'returns `network` with custom `port`')
	assert.equal(out, laccess({ port: '3000' }), 'accepts `port` as string or number type')
})

test('local-access ({ hostname })', () => {
	const val = '0.0.0.0'
	const out = laccess({ hostname: val })
	assert.match(out.local, val, 'returns `local` with custom `hostname`')
	assert.not.match(out.network, val, 'ignores custom `hostname` for `network` output')
})

test.run()
