var fs = require('fs');

module.exports = function($templateCache) {
  'ngInject';

  $templateCache.put('app.html', fs.readFileSync(__dirname + '/app.html', 'utf8'));
  $templateCache.put('modal/modal.html', fs.readFileSync(__dirname + '/cart/modal/modal.html', 'utf8'));
};
