module.exports = angular.module('cart', [
  'angularModalService',
  require('./item').name
])
  .factory('ShoppingCart', require('./shopping_cart_factory'))
  .component('cart', require('./cart_component'))
  .controller('cartCtrl', require('./cart_controller'));
