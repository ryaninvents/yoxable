# yoxable

> Create an executable from a Yeoman generator

[![CircleCI][circleci-image]][circleci-url]
[![semantic-release][semantic-release-image]][semantic-release-url]

## Usage

```js
#!/usr/bin/env node
/** @file $project/bin/my-generator */

require('yoxable')({
  pkg: require('../package.json'),
  generators: [
    require('../lib/generator1'),
    require('../lib/generator2'),
    // ... etc.
  ],
})(process.argv.slice(2));
```

Please note that unless you remove the first 2 arguments, `node` and the name of your executable will be interpreted as Yeoman generators, and startup will fail.

If no arguments are provided, the first generator in the list is run.

[semantic-release-image]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[semantic-release-url]: https://github.com/semantic-release/semantic-release

[circleci-image]: https://img.shields.io/circleci/project/github/ryaninvents/yoxable/master.svg?logo=circleci

[circleci-url]: https://circleci.com/gh/ryaninvents/yoxable
