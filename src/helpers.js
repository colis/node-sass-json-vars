import appRoot from 'app-root-path';
import jsonfile from 'jsonfile';

export const loadJSON = options => {
  const configPath = `${appRoot}/${options.configPath || 'config/variables.json'}`;
  const json = jsonfile.readFileSync(configPath, { throws: false });

  if (!json) {
    throw new Error(`${configPath} not found or not in a valid JSON format.`);
  }

  return json;
};
