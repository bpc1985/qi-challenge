var fs = require('fs');
var noop = require('lodash/noop');

module.exports = {
  bindings: {
    product: '<data',
    addCart: '&addCart'
  },
  template: fs.readFileSync(__dirname + '/product.html', 'utf8'),
  controller: noop
};
