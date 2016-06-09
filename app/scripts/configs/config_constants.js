var commonConfig = require('../../../config/common.json');

module.exports = ['$provide', function($provide) {
  'use strict';

  function registerConstants(constants) {
    _.forEach(constants, function(value, key) {
      $provide.constant(key, value);
    });
  }

  registerConstants(commonConfig);
}];
