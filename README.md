# node-sass-json-vars

This module defines additional built-in Sass functions that allow using variables from `.json` files in `.scss` files.

[![npm](https://img.shields.io/npm/v/node-sass-json-vars.svg)](https://www.npmjs.com/package/node-sass-json-vars)
[![CI Workflow](https://github.com/colis/wally/workflows/CI%20Workflow/badge.svg)](https://github.com/colis/node-sass-json-vars/actions)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)

## Installation

```sh
npm install --save-dev node-sass-json-vars
```

_Note: it's recommended to install **node-sass-json-vars** locally project by project._

## Usage
### Webpack / [sass-loader](https://github.com/jtangelder/sass-loader)

#### webpack.config.js

```javascript
const sassFunctions = require('node-sass-json-vars');

module.exports = {
...
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: "sass-loader",
        options: {
          sassOptions: {
            functions: sassFunctions,
          },
        },
      },
    ],
  },
...
}
```

## Functions

* `getMapFromJSON($key, $config)`: transforms a JSON Object into a SASS Map.
  - $key: object key, e.g. `"colors"`
  - $config: path of the config file, e.g. `"/path/to/variables.json"`. Defaults to `config/variables.json`

### Example

`config/variables.json`

```json
{
	"colors": {
		"catalina-blue": "#1D3557",
		"charlotte": "#A8DADC",
		"panache": "#F1FAEE",
		"amaranth": "#E63946",
		"jelly-bean": "#457B9D"
	}
}
```

`_colors.scss`

```scss
$colors: getMapFromJSON("colors");

:root {
	// Brand colours.
	@each $colorName, $colorHex in $colors {
		--color-#{$colorName}: #{$colorHex};
	}
}
```

`style.css`

```css
:root {
	--color-catalina-blue: #1d3557;
	--color-charlotte: #a8dadc;
	--color-panache: #f1faee;
	--color-amaranth: #e63946;
	--color-jelly-bean: #457b9d;
}
```
