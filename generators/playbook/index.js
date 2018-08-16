'use strict';
const {
  compose,
  forEach,
  head,
  isEmpty,
  isNil,
  join,
  juxt,
  not,
  or,
  tail,
  toUpper,
} = require('ramda');
const Generator = require('yeoman-generator');
const mkdirp = require('mkdirp');

module.exports = class extends Generator {
  constructor(args, options) {
    super(args, options);

    this.option('playbookName', {
      type: String,
      required: false,
      desc: 'What to name the playbook',
    });

    this.option('limit', {
      type: String,
      required: false,
      desc: 'Which hosts to target when running the playbook by default',
    });

    this.option('bootstrapPython', {
      type: Boolean,
      required: false,
      desc: 'Whether to install Python on the target before running the playbook',
    });

    this.option('playbookDesc', {
      type: String,
      required: false,
      desc: 'A short description of the playbook to populate the README.md file',
    });
  }

  prompting() {
    const prompts = [
      {
        name: 'limit',
        message:
          'Which host will this playbook target? (single host or comma separated list, eg `host1,host2`)',
        type: 'input',
        validate: compose(
          not,
          isEmpty,
        ),
        default: or(this.options.limit, 'all'),
        when: isNil(this.options.limit),
      },
      {
        name: 'bootstrapPython',
        message: 'Do the targeted hosts need Python installed?',
        type: 'confirm',
        validate: compose(
          not,
          isEmpty,
        ),
        default: or(this.options.bootstrapPython, true),
        when: isNil(this.options.bootstrapPython),
      },
      {
        name: 'playbookDesc',
        message: 'What does this playbook do? (markdown supported)',
        type: 'input',
        validate: compose(
          not,
          isEmpty,
        ),
        default: or(this.options.playbookDesc, undefined),
        when: isNil(this.options.playbookDesc),
      },
      {
        name: 'playbookName',
        message: 'What is the name for this playbook?',
        type: 'input',
        validate: compose(
          not,
          isEmpty,
        ),
        default: or(this.options.playbookName, undefined),
        when: isNil(this.options.playbookName),
      },
    ];

    return this.prompt(prompts).then(props => {
      this.props = {
        limit: this.options.limit,
        bootstrapPython: this.options.bootstrapPython,
        playbookDesc: this.options.playbookDesc,
        playbookName: this.options.playbookName,
        ...props,
      };
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
      forEach(mkdirp, dirs);
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
