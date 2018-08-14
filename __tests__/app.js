'use strict';
const { readFileSync } = require('fs');
const helpers = require('yeoman-test');

describe('generator-ansible-play:app', () => {
  describe('running on a new project', () => {
    beforeAll(() => {
      return helpers.run(require.resolve('../generators/app')).withPrompts({
        name: 'Coaxial',
        email: 'cxl@example.org',
        website: 'https://example.org',
        license: 'MIT',
      });
    });

    it('creates a LICENSE file with the right information', () => {
      const actual = readFileSync('LICENSE', 'utf8');

      expect(actual).toMatchSnapshot();
    });
  });
});
