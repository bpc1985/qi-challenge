var fs = require('fs');

module.exports = {
  template: fs.readFileSync(__dirname + '/product_list.html', 'utf8'),
  controller: 'productListCtrl'
};
