import sass from 'node-sass';
import jsonfile from 'jsonfile';
import appRoot from 'app-root-path';

/**
 * Transform a JSON Object into a SASS Map.
 *
 * @param {String} key The key of the JSON Object.
 * @return {sass.types.Map}
 */
export default function getMapFromJSON(key) {
  if (!(key instanceof sass.types.String)) {
    throw '$key: Expected a string.';
  }

  const json = jsonfile.readFileSync(`${appRoot}/config/variables.json`);

  const sassVars = json[key.getValue()];

  const map = new sass.types.Map(Object.keys(sassVars).length);

  Object.entries(sassVars).forEach(([key, value], index) => {
    map.setKey(index, new sass.types.String(key));
    map.setValue(index, new sass.types.String(value));
  });

  return map;
}
