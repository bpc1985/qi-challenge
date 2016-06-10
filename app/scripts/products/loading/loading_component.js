var fs = require('fs');
var noop = require('lodash/noop');

module.exports = {
  bindings: {
    loadData: '&',
    showLoading: '<'
  },
  template: fs.readFileSync(__dirname + '/loading.html', 'utf8'),
  controller: noop
};
