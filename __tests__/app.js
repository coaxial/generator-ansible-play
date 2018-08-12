'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-ansible-play:app', () => {
  describe('by default', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts({ initGit: true });
    });

    it('initializes a git repo', () => {
      assert.file('.git');
    });
  });

  describe('when told not to init a git repo', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/app'))
        .withPrompts({ initGit: false });
    });
    it('will not', () => {
      assert.noFile('.git');
    });
  });
});
