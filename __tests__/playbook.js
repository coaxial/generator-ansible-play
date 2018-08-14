'use strict';
const { readFileSync } = require('fs');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const path = require('path');

describe('generator-ansible-play:playbook', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/playbook')).withPrompts({
      limit: 'test-host',
    });
  });

  it('creates the skeleton', () => {
    assert.file(['handlers', 'tasks', 'templates', 'vars']);
  });

  it('creates the Makefile', () => {
    const actual = readFileSync('Makefile', 'utf8');

    expect(actual).toMatchSnapshot();
  });

  it('creates the requirements file', () => {
    const actual = readFileSync('requirements.yml', 'utf8');

    expect(actual).toMatchSnapshot();
  });
});
