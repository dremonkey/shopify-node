'use strict';

var ShopifyResource = require('../ShopifyResource')
  , shopifyMethod = ShopifyResource.method;

module.exports = ShopifyResource.extend({
  path: 'events',
  
  includeBasic: [
    'list',
    'retrieve',
    'count'
  ]
});
