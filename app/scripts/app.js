var angular = require('angular');

angular.module('qentinelShoppingCart', [
  require('angular-animate'),
  require('angular-sanitize'),
  require('angular-route'),
  require('./guide').name,
  require('./products').name,
  require('./cart').name
])
.config(require('./configs/config_constants'))
.config(function($routeProvider) {
  'ngInject';

  $routeProvider
    .when('/', {
      templateUrl: 'app.html'
    });
})
.run(require('./templates'));
