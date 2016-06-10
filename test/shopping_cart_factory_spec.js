'use strict';

require('angular-mocks');

describe('ShoppingCart', function() {

  var MyShoppingCart;
  var items = [];

  beforeEach(function() {
    angular.mock.module(function($provide) {
      $provide.factory('ShoppingCart', function() {
        return {
          addItem: function(itm){
            items.push(itm);
          },
          getItems: function() {
            return items;
          }
        }
      });
    });
  });

  beforeEach(function() {
    angular.mock.inject(function(ShoppingCart) {
      MyShoppingCart = ShoppingCart;
    });
  });

  it('should able to add item and get items', function() {
    MyShoppingCart.addItem({id: 'a'});
    MyShoppingCart.addItem({id: 'b'});

    var items = MyShoppingCart.getItems();
    expect(items.length).toEqual(2);
  });
});
