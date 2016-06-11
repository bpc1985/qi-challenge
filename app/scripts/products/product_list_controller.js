module.exports = function($http, $timeout, ShoppingCart, TIME_INTERVAL) {
  'ngInject';

  var $ctrl = this;
  $ctrl.showLoading = false;

  $ctrl.loadProducts = function() {
    if(!$ctrl.products) {
      $ctrl.showLoading = true;
      $timeout(function() {
        $http.get('scripts/data/products.json').success(function(data){
          $ctrl.products = data.products;
          $ctrl.showLoading = false;
        });
      }, TIME_INTERVAL);
    }
  }

  $ctrl.addToCart = function(product) {
    ShoppingCart.addItem(product);
  }
};
