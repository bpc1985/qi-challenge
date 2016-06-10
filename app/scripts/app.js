var angular = require('angular');

angular.module('qentinelShoppingCart', [
  require('angular-animate'),
  require('angular-sanitize'),
  require('angular-route'),
  require('./main').name,
  require('./guide').name,
  require('./products').name,
  require('./cart').name
])
.config(require('./configs/config_constants'))
.config(function($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl',
      controllerAs: 'ctrl'
    });
})
.run(require('./templates'));
