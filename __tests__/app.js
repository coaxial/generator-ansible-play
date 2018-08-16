'use strict';
const { basename } = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-ansible-play:app', () => {
  describe('running on a new project', () => {
    beforeAll(() => {
      jest.mock('generator-license', () => {
        const helpers = require('yeoman-test');
        return helpers.createDummyGenerator();
      });

      return helpers.run(require.resolve('../generators/app')).withPrompts({
        authorName: 'Coaxial',
        authorEmail: 'cxl@example.org',
        authorWebsite: 'https://example.org',
        playName: 'test name',
      });
    });

    it('creates the destination directory', () => {
      const actual = basename(process.cwd());
      const expected = 'test-name';

      return assert.textEqual(actual, expected);
    });
  });
});
