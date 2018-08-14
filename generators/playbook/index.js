'use strict';
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        name: 'limit',
        message:
          'Which host will this playbook target? (single host or comma separated list, eg `host1,host2`)',
        required: true,
        default: 'all',
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const p = this.props;
    const createSkel = () => {
      const dirs = ['handlers', 'tasks', 'templates', 'vars'];
      dirs.forEach(dir => mkdirp(dir));
    };
    const createFiles = () => {
      this.fs.copyTpl(this.templatePath('Makefile'), this.destinationPath('Makefile'), {
        limit: p.limit,
      });

      const files = ['requirements.yml', 'playbook.yml'];
      files.forEach(file =>
        this.fs.copy(this.templatePath(file), this.destinationPath(file)),
      );
    };

    createSkel();
    createFiles();
  }

  install() {}
};
