'use strict';
const { readFileSync } = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const path = require('path');

describe('generator-ansible-play:playbook', () => {
  describe('with the default answers', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/playbook')).withPrompts({
        limit: 'test-host',
        bootstrapPython: true,
      });
    });

    it('creates the skeleton', () => {
      assert.file(['handlers', 'tasks', 'templates', 'vars']);
    });

    it('creates the empty yml files', () => {
      assert.file(['vars/vars.yml', 'handlers/main.yml', 'tasks/main.yml']);
    });

    it('creates the Makefile', () => {
      const actual = readFileSync('Makefile', 'utf8');

      expect(actual).toMatchSnapshot();
    });

    it('creates the requirements file', () => {
      const actual = readFileSync('requirements.yml', 'utf8');

      expect(actual).toMatchSnapshot();
    });

    it('creates the playbook', () => {
      const actual = readFileSync('playbook.yml', 'utf8');

      expect(actual).toMatchSnapshot();
    });
  });

  describe('when not bootstrapping Python', () => {
    beforeAll(() => {
      return helpers.run(path.join(__dirname, '../generators/playbook')).withPrompts({
        limit: 'test-host',
        bootstrapPython: false,
      });
    });

    it('creates the requirements file', () => {
      const actual = readFileSync('requirements.yml', 'utf8');

      expect(actual).toMatchSnapshot();
    });

    it('creates the playbook', () => {
      const actual = readFileSync('playbook.yml', 'utf8');

      expect(actual).toMatchSnapshot();
    });
  });
});
