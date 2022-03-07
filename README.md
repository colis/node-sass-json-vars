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
### [node-sass](https://github.com/sass/node-sass)
This module uses the `functions` option of the [JavaScript API](https://sass-lang.com/documentation/js-api#functions).

```javascript
const sass = require('node-sass');
const sassFunctions = require('node-sass-json-vars');

const result = sass.renderSync({
  file: 'assets/sass/style.scss',
  functions: sassFunctions,
  configPath: 'my_folder/my_variables.json', // if not set, it defaults to 'config/variables.json'
  [, options..]
});
console.log(result.css.toString());
// body {
//   color: #E63946;
// }

sass.render({
  file: 'assets/sass/style.scss',
  functions: sassFunctions,
  configPath: 'my_folder/my_variables.json', // if not set, it defaults to 'config/variables.json'
  [, options..]
}, function(err, result) {
  console.log(result.css.toString());
  // body {
  //   color: #E63946;
  // }
});
```

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
          implementation: require('node-sass'),
          sassOptions: {
            functions: sassFunctions,
            configPath: 'my_folder/my_variables.json', // if not set, it defaults to 'config/variables.json'
          },
        },
      },
    ],
  },
...
}
```

### [node-sass](https://github.com/sass/node-sass) command-line interface

To run this module using node-sass CLI, add its installation path to the `--functions` option: 

```sh
node-sass --functions node_modules/node-sass-json-vars/lib/index.js assets/sass/style.scss dist/css/style.css
```

_Note: the node-sass CLI doesn't accept custom options, therefore the `configPath` value can't be passed to the module. As a workaround, you can create a file named `variables.json` - which contains all the variables that will be used in the stylesheets - and put it in a folder named `config`, e.g.:_


```
.
├── 404.php
├── assets
│   └── sass
├── composer.json
├── composer.lock
├── config
│   └── variables.json
├── footer.php
├── functions.php
├── node_modules
```

## Functions

* `getMapFromJSON($key)`: transforms a JSON Object into a SASS Map.

### Example

`variables.json`

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
