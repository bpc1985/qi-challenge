var find = require('lodash/find');

module.exports = function() {
  'ngInject';

  var items = [];

  return {
    addItem: function(item) {
      var found = find(items, {id: item.id});
      if(!found) {
        items.push(item);
      }
    },

    getItems: function() {
      return items;
    }
  }

};
