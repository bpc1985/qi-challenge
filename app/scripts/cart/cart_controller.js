var isEmpty = require('lodash/isempty');

module.exports = function(ModalService, ShoppingCart) {
  'ngInject';

  var $ctrl = this;

  $ctrl.$onInit = function() {
    $ctrl.items = ShoppingCart.getItems();
  }

  $ctrl.isEmpty = function() {
    return isEmpty($ctrl.items);
  }

  $ctrl.placeOrder = function() {
    if(!$ctrl.isEmpty()) {
      ModalService.showModal({
        templateUrl: 'views/modal.html',
        controller: 'ModalCtrl'
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          console.log(result);
        });
      });
    }
  }
};
