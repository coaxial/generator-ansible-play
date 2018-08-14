'use strict';
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');
const { paramCase } = require('change-case');
const path = require('path');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        name: 'playbookName',
        type: 'input',
        message: "What will the new playbook's name be?",
        require: true,
      },
      {
        name: 'authorName',
        type: 'input',
        message: "Who is this playbook's author?",
        store: true,
        required: true,
      },
      {
        name: 'authorWebsite',
        type: 'input',
        message: "What is the website for the playbook's author?",
        store: true,
      },
      {
        name: 'authorEmail',
        type: 'input',
        message: "What is the author's email?",
        store: true,
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  default() {
    const p = this.props;

    this.composeWith(require.resolve('../git'));
    this.composeWith(require.resolve('generator-license/app'), {
      name: p.authorName,
      email: p.authorEmail,
      website: p.authorWebsite,
    });
    this.composeWith(require.resolve('../playbook'));
  }

  writing() {
    const p = this.props;

    const createDestdir = destinationPath => {
      if (path.basename(this.destinationPath()) !== destinationPath) {
        this.log(`Destination path ${destinationPath} does not exist, creating it...`);
        mkdirp(destinationPath);
        this.destinationRoot(this.destinationPath(destinationPath));
      }
    };

    createDestdir(paramCase(p.playbookName));
  }

  install() {}
};
