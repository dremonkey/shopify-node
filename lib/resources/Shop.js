'use strict';

var ShopifyResource = require('../ShopifyResource');
var shopifyMethod = ShopifyResource.method;

module.exports = ShopifyResource.extend({
  path: 'shop',

  // custom retrieve method because no id is required
  retrieve: shopifyMethod({
    method: 'GET'
  })
});
