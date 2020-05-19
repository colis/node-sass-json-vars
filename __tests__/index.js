import sass from 'node-sass';
import functions from '../src/index';

describe('Get variables from JSON file', () => {
  it('turns JSON variable into a Sass Map', () => {
    const EXPECTED_CSS = 'body {\n  color: #E63946; }\n';
    const result = sass.renderSync({
      file: '__tests__/fixtures/maps/style.scss',
      configPath: '__tests__/fixtures/maps/variables.json',
      functions,
    });

    expect(result.css.toString()).toMatch(EXPECTED_CSS);
  });

  it('throws when the parameter is not a string', () => {
    expect(() => {
      sass.renderSync({
        file: '__tests__/fixtures/maps/wrongParam.scss',
        configPath: '__tests__/fixtures/maps/variables.json',
        functions,
      });
    }).toThrowError('$key: Expected a string.');
  });

  it('throws when the parameter is not a valid key', () => {
    expect(() => {
      sass.renderSync({
        file: '__tests__/fixtures/maps/wrongKey.scss',
        configPath: '__tests__/fixtures/maps/variables.json',
        functions,
      });
    }).toThrowError('"wrongKey" is not a valid key.');
  });
});

describe('Read JSON file', () => {
  it('throws when the config path does not exist', () => {
    const configPath = 'wrong/path.json';
    expect(() => {
      sass.renderSync({
        file: '__tests__/fixtures/maps/style.scss',
        configPath,
        functions,
      });
    }).toThrow();
  });

  it('throws when the file is not in a valid JSON format', () => {
    const configPath = '__tests__/fixtures/invalid-json/variables.json';
    expect(() => {
      sass.renderSync({
        file: '__tests__/fixtures/invalid-json/style.scss',
        configPath,
        functions,
      });
    }).toThrow();
  });
});
