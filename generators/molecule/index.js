const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {}

  writing() {
    this.fs.copyTpl(
      this.templatePath('.travis.yml'),
      this.destinationPath('.travis.yml'),
    );
  }

  install() {}
};
