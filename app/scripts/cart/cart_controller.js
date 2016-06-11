var isEmpty = require('lodash/isempty');
var fs = require('fs');

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
        templateUrl: 'modal/modal.html',
        controller: 'modalCtrl'
      }).then(function(modal) {
        modal.element.modal();
        modal.close.then(function(result) {
          console.log(result);
        });
      });
    }
  }
};
