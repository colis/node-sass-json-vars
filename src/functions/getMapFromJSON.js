import sass from 'node-sass';
import { loadJSON } from '../helpers';

/**
 * Transform a JSON Object into a SASS Map.
 *
 * @param {String} key The key of the JSON Object.
 * @return {sass.types.Map}
 */
export default function getMapFromJSON(key) {
  if (!(key instanceof sass.types.String)) {
    throw new Error('$key: Expected a string.');
  }

  const json = loadJSON(this.options);

  const sassVars = json[key.getValue()];

  if (!sassVars) {
    throw new Error(`"${key.getValue()}" is not a valid key.`);
  }

  const map = new sass.types.Map(Object.keys(sassVars).length);

  Object.entries(sassVars).forEach(([key, value], index) => {
    map.setKey(index, new sass.types.String(key));
    map.setValue(index, new sass.types.String(value));
  });

  return map;
}
