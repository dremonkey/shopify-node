'use strict';

var shopifyMethod = require('./ShopifyMethod')
  , utils = require('./utils');

module.exports = {

  create: shopifyMethod({
    method: 'POST'
  }),

  list: shopifyMethod({
    method: 'GET'
  }),

  retrieve: shopifyMethod({
    method: 'GET',
    path: '{id}',
    urlParams: ['id']
  }),

  update: shopifyMethod({
    method: 'PUT',
    path: '{id}',
    urlParams: ['id']
  }),

  // Avoid 'delete' keyword in JS
  del: shopifyMethod({
    method: 'DELETE',
    path: '{id}',
    urlParams: ['id']
  }),

  count: shopifyMethod({
    method: 'GET',
    path: 'count'
  }),

  search: shopifyMethod({
    method: 'GET',
    path: 'search'
  })
};