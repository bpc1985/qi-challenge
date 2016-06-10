module.exports = function($http, $timeout, ShoppingCart) {
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
      }, 2000);
    }
  }

  $ctrl.addToCart = function(product) {
    ShoppingCart.addItem(product);
  }
};
