var angular = require('angular');

angular.module('qentinelShoppingCart', [
  require('angular-animate'),
  require('angular-sanitize'),
  require('angular-route'),
  require('./cart').name,
])
.config(require('./configs/config_constants'))
.config(function($routeProvider) {
  'ngInject';

  $routeProvider.otherwise({
    redirectTo: '/'
  });

})
.run(require('./templates'));
