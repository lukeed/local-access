# local-access [![CI](https://github.com/lukeed/local-access/workflows/CI/badge.svg)](https://github.com/lukeed/local-access/actions?query=workflow%3ACI) [![codecov](https://badgen.net/codecov/c/github/lukeed/local-access)](https://codecov.io/gh/lukeed/local-access)

> Retrieve formatted URL addresses for local and LAN access.


## Install

```
$ npm install @tadashi/local-access
```


## Usage

```js
import localAccess from 'local-access'

localAccess()
//=> { local:'http://localhost:8080/', network:'http://10.0.0.3:8080/' }

localAccess({ protocol:'https', port:3000 })
//=> { local:'https://localhost:3000/', network:'https://10.0.0.3:3000/' }

localAccess({ protocol:'ws', port:3000 })
//=> { local:'ws://localhost:3000/', network:'ws://10.0.0.3:3000/' }

localAccess({ pathname:'foo/bar' })
//=> { local:'http://localhost:8080/foo/bar', network:'http://10.0.0.3:8080/foo/bar' }
```


## API

### localAccess(options)

Parsing and formatting is controlled by [`WHATWG URL API`](https://nodejs.org/api/url.html#url_the_whatwg_url_api), which means its `options` are inherited.

#### options

Type: `Object`

A [`URL`](https://nodejs.org/api/url.html#url_the_whatwg_url_api) instance, or _any_ object with matching keys.

#### options.protocol

Type: `String`<br>
Default: `http`

Same as [`urlObject.protocol`](https://nodejs.org/api/url.html#url_url_protocol) -- added a default value.

#### options.hostname

Type: `String`<br>
Default: `'localhost'`

Same as [`urlObject.hostname`](https://nodejs.org/api/url.html#url_url_hostname) -- added a default value.

#### options.port

Type: `Number` or `String`<br>
Default: `process.env.PORT || 8080`

Same as [`urlObject.port`](https://nodejs.org/api/url.html#url_url_port) -- added a default value.


## License

MIT © [Luke Edwards](https://lukeed.com)
