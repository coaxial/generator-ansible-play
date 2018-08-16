'use strict';
const { compose, isNil, not } = require('ramda');
const Generator = require('yeoman-generator');

module.exports = class extends Generator {
  prompting() {
    const prompts = [
      {
        type: 'confirm',
        name: 'initGit',
        message: 'Initialize a git repository and generate a .gitignore?',
        default: true,
        validate: compose(
          not,
          isNil,
        ),
        store: true,
      },
      {
        type: 'input',
        name: 'gitHost',
        message: 'What is the hostname for the server hosting the git repo?',
        default: 'github.com',
        when: answers => answers.initGit,
        validate: compose(
          not,
          isNil,
        ),
        store: true,
      },
      {
        type: 'input',
        name: 'gitUser',
        message: 'What is the username on the git server?',
        when: answers => answers.initGit,
        validate: compose(
          not,
          isNil,
        ),
        store: true,
      },
      {
        type: 'input',
        name: 'gitRepo',
        message: "What is the repo's name on the git server?",
        when: answers => answers.initGit,
        validate: compose(
          not,
          isNil,
        ),
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = props;
    });
  }

  writing() {
    const p = this.props;

    if (p.initGit) {
      const originUrl = `git@${p.gitHost}:${p.gitUser}/${p.gitRepo}.git`;
      this.spawnCommandSync('git', ['init', '--quiet']);
      this.fs.copy(this.templatePath('gitignore'), this.destinationPath('.gitignore'));
      this.spawnCommandSync('git', ['remote', 'add', 'origin', originUrl]);
    }
  }

  install() {}
};
