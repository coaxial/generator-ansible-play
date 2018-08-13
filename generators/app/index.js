'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    this.composeWith(require.resolve('../git'));
  }

  writing() {}

  install() {}
};
