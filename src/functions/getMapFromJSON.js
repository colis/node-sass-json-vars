import sass from 'sass';
import { loadJSON } from '../helpers';

/**
 * Transform a JSON Object into a SASS Map.
 *
 * @param {Object} args Custom function args.
 * @return {sass.SassMap}
 */
export default function getMapFromJSON(args) {
  let json;

  const key = args[0].assertString('key');

  if (args[1].toString() === 'null') {
    json = loadJSON();
  } else {
    json = loadJSON(args[1].assertString('config').toString().replaceAll('"', ''));
  }

  const sassVars = json[key.toString().replaceAll('"', '')];

  if (!sassVars) {
    throw new Error(`${key} is not a valid key.`);
  }

  const contents = new Map();

  Object.entries(sassVars).forEach(([key, value]) => {
    contents.set(
      new sass.SassString(key, { quotes: false }),
      new sass.SassString(value, { quotes: false }),
    );
  });

  const map = new sass.SassMap(contents);

  return map;
}
