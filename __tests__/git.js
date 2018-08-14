'use strict';
const gitRemoteOriginUrl = require('git-remote-origin-url');

const { readFileSync } = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const path = require('path');

describe('generator-ansible-play:git', () => {
  describe('by default', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/git')).withPrompts({
        initGit: true,
        gitHost: 'example.com',
        gitUser: 'coaxial',
        gitRepo: 'myrepo',
      });
    });

    it('initializes a git repo', () => {
      assert.file('.git');
    });

    it('generates a .gitignore file', () => {
      const actual = readFileSync('.gitignore', 'utf8');

      expect(actual).toMatchSnapshot();
    });

    it('sets the correct origin URL', () => {
      expect.assertions(1);

      const expected = 'git@example.com:coaxial/myrepo.git';

      return gitRemoteOriginUrl().then(originUrl => expect(originUrl).toEqual(expected));
    });
  });

  describe('when told not to init a git repo', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/git'))
        .withPrompts({ initGit: false });
    });

    it('will not init a git repo', () => {
      assert.noFile('.git');
    });

    it('will not generate a .gitignore', () => {
      assert.noFile('.gitignore');
    });
  });
});
