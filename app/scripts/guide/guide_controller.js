module.exports = function($http, $sce) {
  'ngInject';

  var $ctrl = this;

  $ctrl.$onInit = function() {
    $http.get('scripts/data/instructions.json').success(function(data){
      var text = data.instructions.replace(/\n/g, '<br />');
      $ctrl.instructions = $sce.trustAsHtml(text);
    });
  };

};
