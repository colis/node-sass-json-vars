import { compile } from 'sass';
import functions from '../src/index';

describe('Get variables from JSON file', () => {
  it('turns JSON variable into a Sass Map', () => {
    const result = compile('__tests__/fixtures/maps/style.scss', {
      functions,
    });

    expect(result.css).toMatch(/color: #E63946;/);
  });

  it('throws when the parameter is not a string', () => {
    expect(() => {
      compile('__tests__/fixtures/maps/wrongParam.scss', {
        functions,
      });
    }).toThrowError('$key: 1 is not a string.');
  });

  it('throws when the parameter is not a valid key', () => {
    expect(() => {
      compile('__tests__/fixtures/maps/wrongKey.scss', {
        functions,
      });
    }).toThrowError('"wrongKey" is not a valid key.');
  });
});

describe('Read JSON file', () => {
  it('throws when the config path does not exist', () => {
    expect(() => {
      compile('__tests__/fixtures/invalid-config-path/style.scss', {
        functions,
      });
    }).toThrow();
  });

  it('throws when the file is not in a valid JSON format', () => {
    expect(() => {
      compile('__tests__/fixtures/invalid-json/style.scss', {
        functions,
      });
    }).toThrow();
  });
});
