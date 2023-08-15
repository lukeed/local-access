# @tadashi/local-access

[![NPM version][npm-img]][npm]
[![Build Status][ci-img]][ci]
[![Coverage Status][coveralls-img]][coveralls]


[npm-img]:         https://img.shields.io/npm/v/@tadashi/local-access.svg
[npm]:             https://www.npmjs.com/package/@tadashi/local-access
[ci-img]:          https://github.com/lagden/local-access/actions/workflows/nodejs.yml/badge.svg
[ci]:              https://github.com/lagden/local-access/actions/workflows/nodejs.yml
[coveralls-img]:   https://coveralls.io/repos/github/lagden/local-access/badge.svg?branch=master
[coveralls]:       https://coveralls.io/github/lagden/local-access?branch=master


Retrieve formatted URL addresses for local and LAN access.


## Install

```
$ npm install @tadashi/local-access
```


## Usage

```js
import la from '@tadashi/local-access'

la()
//=> { local:'http://localhost:8080/', network:'http://10.0.0.3:8080/' }

la({ protocol:'https', port:3000 })
//=> { local:'https://localhost:3000/', network:'https://10.0.0.3:3000/' }

la({ protocol:'ws', port:3000 })
//=> { local:'ws://localhost:3000/', network:'ws://10.0.0.3:3000/' }

la({ pathname:'foo/bar' })
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
MIT © [Thiago Lagden](https://github.com/lagden)
