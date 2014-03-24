'use strict';

// @NOTE Needs more testing

var ShopifyResource = require('../ShopifyResource')
  , shopifyMethod = ShopifyResource.method;

module.exports = ShopifyResource.extend({
  path: 'application_charges',
  
  includeBasic: [
    'create',
    'list',
    'retrieve'
  ],

  activate: shopifyMethod({
    method: 'POST',
    path: '{id}/activate',
    urlParams: ['id']
  })
});
