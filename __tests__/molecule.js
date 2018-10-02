const { clone } = require('ramda');

const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const path = require('path');

describe('generator-ansible-playbook:molecule', () => {
  const defaultResponses = {};

  describe('when all the prompts have answers', () => {
    beforeAll(() => {
      const clonedResponses = clone(defaultResponses);
      return helpers
        .run(path.join(__dirname, '../generators/molecule'))
        .withPrompts(clonedResponses);
    });

    describe('.travis.yml', () => {
      const filePath = '.travis.yml';

      it('exists', () => {
        assert.file(filePath);
      });
    });
  });
});
