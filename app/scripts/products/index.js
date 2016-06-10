module.exports = angular.module('products', [
  require('./loading').name,
  require('./product').name
])
  .component('productList', require('./product_list_component'))
  .controller('productListCtrl', require('./product_list_controller'));
