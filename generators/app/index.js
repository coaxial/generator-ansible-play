'use strict';
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
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
  }

  writing() {}

  install() {}
};
