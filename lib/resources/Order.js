'use strict';

var ShopifyResource = require('../ShopifyResource');
var shopifyMethod = ShopifyResource.method;

module.exports = ShopifyResource.extend({
  path: 'orders',
  includeBasic: [
    'list', 'retrieve'
  ],
});
