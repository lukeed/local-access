const test = require('tape');
const fn = require('../');

const isStr = x => typeof x === 'string';
const isObj = x => Boolean(x) && (x.constructor === Object);

test('local-access', t => {
	t.equal(typeof fn, 'function', 'exports a function');
	t.end()
});

test('local-access (returns)', t => {
	const out = fn();
	t.true(isObj(out), 'returns an object');
	t.true(out.local !== void 0, 'contains a `local` key');
	t.true(isStr(out.local), 'returns `local` as `string` type');
	t.true(out.network !== void 0, 'contains a `network` key');
	t.true(isStr(out.network), 'returns `network` as `string` type');
	t.end();
});

test('local-access (defaults)', t => {
	const out = fn();
	t.equal(out.local, 'http://localhost:8080', 'returns `local` as expected');
	t.true(out.network.includes('http://'), 'returns `network` with expected protocol');
	t.true(out.network.includes('8080'), 'returns `network` with expected port');
	t.end();
});

test('local-access ({ https })', t => {
	const out = fn({ https:true });
	t.true(out.local.includes('https://'), 'returns `local` with `https` protocol');
	t.true(out.network.includes('https://'), 'returns `network` with `https` protocol');
	t.end();
});

test('local-access ({ port })', t => {
	const out = fn({ port:3000 });
	const foo = fn({ port:'3000' });
	t.true(out.local.includes(':3000'), 'returns `local` with custom `port`');
	t.true(out.network.includes(':3000'), 'returns `network` with custom `port`');
	t.deepEqual(out, foo, 'accepts `port` as string or number type');
	t.end();
});

test('local-access ({ hostname })', t => {
	const val = '0.0.0.0';
	const out = fn({ hostname:val });
	t.true(out.local.includes(val), 'returns `local` with custom `hostname`');
	t.false(out.network.includes(val), 'ignores custom `hostname` for `network` output');
	t.end();
});
