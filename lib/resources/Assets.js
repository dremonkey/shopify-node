'use strict';

// @NOTE Need to test

var ShopifyResource = require('../ShopifyResource')
  , shopifyMethod = ShopifyResource.method;

module.exports = ShopifyResource.extend({
  path: 'themes',

  list: shopifyMethod({
    method: 'GET',
    path: '{themeId}/assets',
    urlParams: ['themeId']
  }),

  retrieve: shopifyMethod({
    method: 'GET',
    path: '{themeId}/assets',
    urlParams: ['themeId', 'asset[key]', 'theme_id']
  }),

  create: shopifyMethod({
    method: 'PUT',
    path: '{themeId}/assets',
    urlParams: ['themeId']
  }),

  update: shopifyMethod({
    method: 'PUT',
    path: '{themeId}/assets',
    urlParams: ['themeId']
  }),

  del: shopifyMethod({
    method: 'DELETE',
    path: '{themeId}/assets',
    urlParams: ['themeId', 'asset[key]']
  })
});
