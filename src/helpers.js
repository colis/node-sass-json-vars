import appRoot from 'app-root-path';
import jsonfile from 'jsonfile';

export const loadJSON = (configPath = 'config/variables.json') => {
  const path = `${appRoot}/${configPath}`;
  const json = jsonfile.readFileSync(path);

  if (!json) {
    throw new Error(`${path} not found or not in a valid JSON format.`);
  }

  return json;
};
