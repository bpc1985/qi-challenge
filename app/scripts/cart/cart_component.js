var fs = require('fs');

module.exports = {
  template: fs.readFileSync(__dirname + '/cart.html', 'utf8'),
  controller: 'cartCtrl'
};
