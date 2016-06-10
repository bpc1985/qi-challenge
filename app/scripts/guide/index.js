module.exports = angular.module('guide', [])
  .component('guide', require('./guide_component'))
  .controller('guideCtrl', require('./guide_controller'));;
