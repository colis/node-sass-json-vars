import sass from 'node-sass';
import functions from '../src/index';

const EXPECTED_CSS = 'body {\n  color: #E63946; }\n';

describe('Get variables from JSON file', () => {
  it('turns JSON variable into a Sass Map', () => {
    let result = sass.renderSync({
      file: '__tests__/fixtures/maps/style.scss',
      functions,
    });

    expect(result.css.toString()).toMatch(EXPECTED_CSS);
  });
});
