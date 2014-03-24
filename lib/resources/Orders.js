'use strict';

// @NOTE Needs more testing

var ShopifyResource = require('../ShopifyResource')
  , shopifyMethod = ShopifyResource.method;

module.exports = ShopifyResource.extend({
  path: 'orders',

  includeBasic: [
    'create',
    'list',
    'retrieve',
    'update',
    'del',
    'count',
    'search'
  ],

  open: shopifyMethod({
    method: 'POST',
    path: '{id}/open',
    urlParams: ['id']
  }),

  close: shopifyMethod({
    method: 'POST',
    path: '{id}/close',
    urlParams: ['id']
  }),

  cancel: shopifyMethod({
    method: 'POST',
    path: '{id}/cancel',
    urlParams: ['id']
  })
});
