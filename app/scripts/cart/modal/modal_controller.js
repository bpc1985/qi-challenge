module.exports = function($scope, close, ShoppingCart) {
  'ngInject';

  $scope.items = ShoppingCart.getItems();

  $scope.close = function(result) {
    close(result, 500);
 };
};
