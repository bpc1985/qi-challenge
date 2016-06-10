var fs = require('fs');
var noop = require('lodash/noop');

module.exports = {
  bindings: {
    item: '<data'
  },
  template: fs.readFileSync(__dirname + '/item.html', 'utf8'),
  controller: noop
};
