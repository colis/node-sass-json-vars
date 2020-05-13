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

## Additional Configuration

Create a file named `variables.json` - which contains all the variables that will be used in the stylesheets - and put it in a folder named `config`, e.g.:

```
.
├── 404.php
├── archive.php
├── composer.json
├── composer.lock
├── config
│   └── variables.json
├── editor-style.css
├── footer.php
├── functions.php
├── node_modules
```

## Usage
### [node-sass](https://github.com/sass/node-sass)
This module uses the `functions` option of the [JavaScript API](https://sass-lang.com/documentation/js-api#functions).

```javascript
const sass = require('node-sass');
const sassFunctions = require('node-sass-json-vars');

const result = sass.renderSync({
  file: scss_filename,
  functions: sassFunctions,
  [, options..]
});
console.log(result.css.toString());
// body {
//   color: #E63946;
// }

sass.render({
  file: scss_filename,
  functions: sassFunctions,
  [, options..]
}, function(err, result) {
  console.log(result.css.toString());
  // body {
  //   color: #E63946;
  // }
});
```

### [node-sass](https://github.com/sass/node-sass) command-line interface

To run this module using node-sass CLI, add its installation path to the `--functions` option: 

```sh
node-sass --functions node_modules/node-sass-json-vars/lib/index.js sass/style.scss style.css
```

### Webpack / [sass-loader](https://github.com/jtangelder/sass-loader)

#### Webpack

```javascript
import sassFunctions from 'node-sass-json-vars';

export default {
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
