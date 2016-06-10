'use strict';

require('angular-mocks');

var includes = require('lodash/includes');

describe('guideCtrl', function() {

  var $controller, $httpBackend, ctrl, scope;

  beforeEach(angular.mock.module('guide'));

  beforeEach(angular.mock.inject(function($rootScope, _$controller_, _$httpBackend_) {
    scope = $rootScope.$new();
    $controller = _$controller_;
    $httpBackend = _$httpBackend_;

    ctrl = $controller('guideCtrl', {
      $scope: scope
    });
  }));

  describe('onInit', function(){
    beforeEach(function(){
      var str = 'You can then put them into the basket by clicking the \"Add\" button next to them.\n\nFinally after having some products in the basket you can order';
      $httpBackend.when('GET', 'scripts/data/instructions.json').respond(200, {instructions: str});
    });

    it('should get instruction string', function(){
      ctrl.$onInit();
      $httpBackend.flush();
      scope.$apply();
      expect(includes(ctrl.instructions.$$unwrapTrustedValue(), 'them.<br /><br />')).toBeTruthy();
    });
  });

});
