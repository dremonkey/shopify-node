'use strict';

var ShopifyResource = require('../ShopifyResource')
  , shopifyMethod = ShopifyResource.method;

module.exports = ShopifyResource.extend({
  path: 'customers',
  
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
