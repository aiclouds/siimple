# neutrine 

> An experimental collection of React UI components based on siimple.

[![npm](https://img.shields.io/npm/v/neutrine.svg?style=flat-square)](https://www.npmjs.com/package/neutrine)
[![npm](https://img.shields.io/npm/dt/neutrine.svg?style=flat-square)](https://www.npmjs.com/package/neutrine)
[![npm](https://img.shields.io/npm/l/neutrine.svg?style=flat-square)](https://github.com/siimple/neutrine)
[![pr](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)]()

:construction: This package is currently under development and API may change at any moment. **Use it at your own risk**.

## Installation

Use `npm` to install this package: 

```
$ npm install --save neutrine
```

## Usage

```javascript
import React from "react";
import {Btn} from "neutrine";

export default class App extends React.Component {
    render() {
        return React.createElement(Btn, {color: "primary"}, "Say hello");
    }
}
```

## License 

Under the [MIT LICENSE](./LICENSE).

