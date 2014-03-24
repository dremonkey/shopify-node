'use strict';

var ShopifyResource = require('../ShopifyResource')
  , shopifyMethod = ShopifyResource.method;

module.exports = ShopifyResource.extend({
  path: 'blogs',
  
  includeBasic: [
    'list',
    'count',
    'retrieve',
    'create',
    'update',
    'del'
  ]
});
