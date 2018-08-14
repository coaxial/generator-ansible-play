'use strict';
const { readFileSync } = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const { basename } = require('path');

describe('generator-ansible-play:app', () => {
  describe('running on a new project', () => {
    beforeAll(() => {
      return helpers.run(require.resolve('../generators/app')).withPrompts({
        authorName: 'Coaxial',
        authorEmail: 'cxl@example.org',
        authorWebsite: 'https://example.org',
        license: 'MIT',
        playbookName: 'test playbook',
      });
    });

    it('creates a LICENSE file with the right information', () => {
      const actual = readFileSync('LICENSE', 'utf8');

      expect(actual).toMatchSnapshot();
    });

    it('creates the destination directory', () => {
      const actual = basename(process.cwd());
      const expected = 'test-playbook';

      assert.textEqual(actual, expected);
    });
  });
});
