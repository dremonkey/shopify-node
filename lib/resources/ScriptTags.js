'use strict';

var ShopifyResource = require('../ShopifyResource');
var shopifyMethod = ShopifyResource.method;

module.exports = ShopifyResource.extend({
  path: 'script_tags',

  includeBasic: [
    'create',
    'list',
    'retrieve',
    'update',
    'del',
    'count'
  ]
});