# Getting Started

## Prerequisites

### Node.js

Node.js is the platform and Javascript runtime used to run the build tools and the development server.

* Recommended on Mac/Linux: Use [nvm](https://github.com/creationix/nvm). The `.nvmrc` file in the project contains the Node version number that is known to be compatible. Running `nvm use` in the project dir will switch your environment to use that Node version.
** Alternatively on Mac, install the node Homebrew package
** Alternatively on Linux, should be available through your package manager. Do check that it's at least 0.10.x. If it's older, get the package from the [Node website](http://nodejs.org/download/).
* On Windows, get from the [Node website](http://nodejs.org/download/)

### Gulp

[Gulp](http://gulpjs.com/) is the JavaScript task runner that runs on Node.js, and is used to run tests and package the application.

Once Node.js is installed, Gulp is available through NPM (The Node Package Manager):

    % npm install -g gulp

## Setup

### Dependencies

All the dependencies are specified by `package.json` and `bower.json` and resolved by NPM or Bower. To download both
kinds of dependencies, run:

    % npm install (or sudo npm install)
    % bower install

If you receive an EACCESS error when trying to install package, you can reference this link

https://docs.npmjs.com/getting-started/fixing-npm-permissions

This will get all the deps and put them under the `node_modules` and
`app/bower_components` directories.

This needs to be done for a fresh clone of the project, and whenever the dependencies in `package.json` or `bower.json` have changed.

### Installing New Dependencies

Install the package using `npm install` with `--save` or `--save-dev`
depending on whether it's a runtime or development dependency;

    % npm install lol --save --save-exact

or

    % npm install lol --save-dev --save-exact


## JSHint

To run JSHint and see that the JavaScript code is lint-free:

    % gulp lint-js

## Tests

To run the test suites (in an embedded [PhantomJS](http://phantomjs.org/) instance):

    % gulp test
    % gulp test-watch

To get reports on code coverage (reports are created in test/coverage directory):

    % gulp test-coverage


## Full Build

To package the application up into production-ready assets:

    % gulp build

After the task, the built assets will be under the `dist` directory.

## Development

To start the development server:

    % gulp server

This starts a long-running server process that serves up the application from localhost.

The server process watches all the application files, and upon changes runs jshint, runs tests, and refreshes the browser window.