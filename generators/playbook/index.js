'use strict';
const { compose, head, isNil, join, juxt, tail, toUpper } = require('ramda');
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        name: 'limit',
        message:
          'Which host will this playbook target? (single host or comma separated list, eg `host1,host2`)',
        type: 'input',
        required: true,
        default: 'all',
      },
      {
        name: 'bootstrapPython',
        message: 'Do the targeted hosts need Python installed?',
        type: 'confirm',
        required: true,
        default: true,
      },
      {
        name: 'playbookName',
        message: 'What is the name for this playbook?',
        type: 'input',
        required: true,
        when: answers => isNil(answers.playbookName),
      },
      {
        name: 'playbookDesc',
        message: 'What does this playbook do? (markdown supported)',
        type: 'input',
        required: true,
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const p = this.props;
    const capitalize = compose(
      join(''),
      juxt([
        compose(
          toUpper,
          head,
        ),
        tail,
      ]),
    );

    const createSkel = () => {
      const dirs = ['handlers', 'tasks', 'templates', 'vars'];
      dirs.forEach(dir => mkdirp(dir));
    };
    const createFiles = () => {
      this.fs.copyTpl(this.templatePath('Makefile'), this.destinationPath('Makefile'), {
        limit: p.limit,
      });

      this.fs.copyTpl(
        this.templatePath('playbook.yml'),
        this.destinationPath('playbook.yml'),
        {
          bootstrapPython: p.bootstrapPython,
        },
      );

      this.fs.copyTpl(
        this.templatePath('requirements.yml'),
        this.destinationPath('requirements.yml'),
        {
          bootstrapPython: p.bootstrapPython,
        },
      );

      this.fs.copyTpl(this.templatePath('README.md'), this.destinationPath('README.md'), {
        playbookName: capitalize(p.playbookName),
        playbookDesc: p.playbookDesc,
        limit: p.limit,
      });

      const mainDests = ['handlers/main.yml', 'tasks/main.yml', 'vars/vars.yml'];
      mainDests.forEach(dest =>
        this.fs.copy(this.templatePath('main.yml'), this.destinationPath(dest)),
      );
    };

    createSkel();
    createFiles();
  }

  install() {}
};
