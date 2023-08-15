import test from 'node:test'
import assert from 'node:assert'
import la from '../src/local.js'

test('local-access (returns)', () => {
	const out = la()
	assert.ok(out.local !== void 0, 'contains a `local` key')
	assert.ok(out.network !== void 0, 'contains a `network` key')
})

test('local-access (defaults)', () => {
	const out = la()
	assert.match(out.network, /http:\/\//, 'returns `network` with expected protocol')
	assert.match(out.network, /8080/, 'returns `network` with expected port')
})

test('local-access ({ pathname })', () => {
	const out = la({ pathname: '/foo/bar' })
	assert.equal(out.local, 'http://localhost:8080/foo/bar', 'returns `local` as expected')
	assert.match(out.network, /http:\/\//, 'returns `network` with expected protocol')
	assert.match(out.network, /8080/, 'returns `network` with expected port')
})

test('local-access ({ protocol: https })', () => {
	const out = la({ protocol:'https' })
	assert.match(out.local, /https:\/\//, 'returns `local` with `https` protocol')
	assert.match(out.network, /https:\/\//, 'returns `network` with `https` protocol')
})

test('local-access ({ protocol: wss })', () => {
	const out = la({ protocol:'wss' })
	assert.match(out.local, /wss:\/\//, 'returns `local` with `wss` protocol')
	assert.match(out.network, /wss:\/\//, 'returns `network` with `wss` protocol')
})

test('local-access ({ port })', () => {
	const out = la({ port: 3000 })
	const outs = la({ port: '3000' })
	assert.match(out.local, /:3000/, 'returns `local` with custom `port`')
	assert.match(out.network, /:3000/, 'returns `network` with custom `port`')
	assert.equal(out.local, outs.local, 'accepts `port` as string or number type')
})

test('local-access ({ hostname })', () => {
	const val = '0.0.0.0'
	const out = la({ hostname: val })
	assert.match(out.local, /0.0.0.0/, 'returns `local` with custom `hostname`')
	assert.notEqual(out.network, /0.0.0.0/, 'ignores custom `hostname` for `network` output')
})
