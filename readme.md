# 1pwd

[![npm](https://img.shields.io/npm/v/1pwd.svg?style=flat-square)](https://www.npmjs.com/package/1pwd) [![tests](https://img.shields.io/travis/deepsweet/1pwd/master.svg?label=tests&style=flat-square)](https://travis-ci.org/deepsweet/1pwd) [![coverage](https://img.shields.io/codecov/c/github/deepsweet/1pwd.svg?style=flat-square)](https://codecov.io/github/deepsweet/1pwd) [![Greenkeeper badge](https://badges.greenkeeper.io/deepsweet/1pwd.svg)](https://greenkeeper.io/)

[1Password CLI](https://blog.agilebits.com/2017/09/06/announcing-the-1password-command-line-tool-public-beta/) wrapper.

## Requirements

* Node.js >= 6
* [`esm` loader](https://github.com/standard-things/esm)
* Official [1Password `op` CLI](https://support.1password.com/command-line-getting-started/#set-up-the-command-line-tool)
* [`op signin`](https://support.1password.com/command-line-getting-started/#get-started-with-the-command-line-tool) with exported session token

## Install

```sh
$ yarn add 1pwd
# or
$ npm install 1pwd
```

## Usage

### `op`

```sh
op --help
```

```ts
(commands: string[], options?: {}) => Promise<string>
```

```js
import { op } from '1pwd'

const result = await op(['list', 'vaults'])
// unparsed stdout as is
```

### `getItem`

```sh
op get item --help
```

```ts
(item: string, options?: {}) => Promise<{}>
```

```js
import { getItem } from '1pwd'

const result = await getItem('item', {
  vault: 'vault',
  includeTrash: true
})
// parsed JSON
```

### `getTotp`

```sh
op get totp --help
```

```ts
(item: string) => Promise<string>
```

```js
import { getTotp } from '1pwd'

const result = await getTotp('item')
// string
```

## TODO

* check for session token and handle `op signin`
* wrap more `op` CLI commands
