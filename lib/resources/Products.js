'use strict';

var ShopifyResource = require('../ShopifyResource')
  , shopifyMethod = ShopifyResource.method;

module.exports = ShopifyResource.extend({
  path: 'products',
  
  includeBasic: [
    'create',
    'list',
    'retrieve',
    'update',
    'del',
    'count',
    'search'
  ]
});
