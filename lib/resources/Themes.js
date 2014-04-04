'use strict';

// @NOTE Need to test

var ShopifyResource = require('../ShopifyResource')
  , shopifyMethod = ShopifyResource.method;

module.exports = ShopifyResource.extend({
  path: 'themes',

  includeBasic: [
    'create',
    'list',
    'retrieve',
    'update',
    'del'
  ],
});
