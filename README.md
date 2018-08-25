# generator-ansible-play [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
>  This Yeoman generator will create a new Ansible playbook and associated `make` commands to run and edit it.

## Installation

First, install [Yeoman](http://yeoman.io) and generator-ansible-play using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-ansible-play
```

Then generate your new project:

```bash
yo ansible-play
```

## Folder structure after running the generator

```
.
├── .gitignore
├── handlers
│   └── main.yml
├── LICENSE
├── Makefile
├── playbook.yml
├── README.md
├── requirements.yml
├── tasks
│   └── main.yml
├── templates
└── vars
    └── vars.yml

4 directories, 9 files
```

## `make` commands

`make editvars`: will edit the encrypted variables file at `vars/enc_vars.yml` and prompt for the password if `.vault_pass` is missing. The password will be written to `.vault_pass` to avoid prompting again. `.vault_pass` is secret and shouldn't be committed to git, it is included in the generated `.gitignore` to avoid accidental commits.

`make`: will run the playbook against the default host(s).

`make limit="host1,host2"`: will run the playbook against host1 and host2 instead of the default host(s).

`make verbosity=-vvv`: will alter verbosity, the values match ansible commands'. Defaults to not verbose.

## Questions, issues, and patches

Open an issue on this repo, and a PR to match if you can.

Questions are welcome as issues.

## Getting To Know Yeoman

 * Yeoman has a heart of gold.
 * Yeoman is a person with feelings and opinions, but is very easy to work with.
 * Yeoman can be too opinionated at times but is easily convinced not to be.
 * Feel free to [learn more about Yeoman](http://yeoman.io/).

## License

MIT © [coaxial](https://64b.it)


[npm-image]: https://badge.fury.io/js/generator-ansible-play.svg
[npm-url]: https://npmjs.org/package/generator-ansible-play
[travis-image]: https://travis-ci.org/coaxial/generator-ansible-play.svg?branch=master
[travis-url]: https://travis-ci.org/coaxial/generator-ansible-play
[daviddm-image]: https://david-dm.org/coaxial/generator-ansible-play.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/coaxial/generator-ansible-play
[coveralls-image]: https://coveralls.io/repos/coaxial/generator-ansible-play/badge.svg
[coveralls-url]: https://coveralls.io/r/coaxial/generator-ansible-play
