var commonConfig = require('../../../config/common.json');

var forEach = require('lodash/foreach');

module.exports = ['$provide', function($provide) {
  'use strict';

  function registerConstants(constants) {
    forEach(constants, function(value, key) {
      $provide.constant(key, value);
    });
  }

  registerConstants(commonConfig);
}];
