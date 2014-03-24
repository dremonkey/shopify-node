'use strict';

var ShopifyResource = require('../ShopifyResource')
  , shopifyMethod = ShopifyResource.method;

module.exports = ShopifyResource.extend({
  path: '',

  list: shopifyMethod({
    method: 'GET',
    path: 'blogs/{blogId}/articles',
    urlParams: ['blogId']
  }),

  count: shopifyMethod({
    method: 'GET',
    path: 'blogs/{blogId}/articles/count',
    urlParams: ['blogId']
  }),

  retrieve: shopifyMethod({
    method: 'GET',
    path: 'blogs/{blogId}/articles/{articleId}',
    urlParams: ['blogId', 'articleId']
  }),

  create: shopifyMethod({
    method: 'POST',
    path: 'blogs/{blogId}/articles',
    urlParams: ['blogId']
  }),

  update: shopifyMethod({
    method: 'PUT',
    path: 'blogs/{blogId}/articles/{articleId}',
    urlParams: ['blogId', 'articleId']
  }),

  del: shopifyMethod({
    method: 'DELETE',
    path: 'blogs/{blogId}/articles/{articleId}',
    urlParams: ['blogId', 'articleId']
  }),

  authors: shopifyMethod({
    method: 'GET',
    path: 'articles/authors'
  }),

  tags: shopifyMethod({
    method: 'GET',
    path: 'articles/tags'
  })
});
