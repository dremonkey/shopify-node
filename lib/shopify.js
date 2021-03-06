'use strict';

var resources = {
  ApplicationCharges: require('./resources/ApplicationCharges'),
  Articles: require('./resources/Articles'),
  Assets: require('./resources/Assets'), // needs testing
  Blogs: require('./resources/Blogs'),
  CarrierServices: '',
  Checkouts: '',
  Collects: '',
  Comments: '',
  Countries: '',
  CustomCollections: '',
  Customers: require('./resources/Customers'),
  CustomerSavedSearchs: '',
  Events: require('./resources/Events'),
  Fulfillments: '',
  FulfillmentServices: '',
  Locations: '',
  Metafields: '',
  Orders: require('./resources/Orders'),
  OrderRisks: '',
  Pages: '',
  Products: require('./resources/Products'),
  ProductImages: '',
  ProductVariants: '',
  Provinces: '',
  RecurringApplicationCharges: '',
  Redirects: '',
  ScriptTags: require('./resources/ScriptTags'),
  Shop: require('./resources/Shop'),
  SmartCollections: '',
  Themes: require('./resources/Themes'),
  Transactions: '',
  Webhooks: ''
};

Shopify.ShopifyResource = require('./ShopifyResource');
Shopify.resources = resources;

/**
 * @param auth.method (string)
 *  Should be either `basic` or `oauth`. Basic should be used with private apps.
 * @param auth.token (string)
 *  If auth.method is `basic` auth.token should be a `apiKey:pass` string.
 *  If auth.method is `oauth` auth.token should be the oauth token.
 * @param shopUrl (string)
 *  Url of the shop, for example test.myshopify.com
 */
function Shopify (auth, shopUrl) {

  if (!auth || !shopUrl) {
    throw new Error('You need to set both the auth and shopurl options.');
  }

  if (!(this instanceof Shopify)) {
    return new Shopify(auth, shopUrl);
  }

  this._api = {
    auth: auth,
    hostname: '',
    shopUrl: shopUrl,
    basePath: '/admin'
  };

  this._setHostname(shopUrl, auth);
  this._prepResources();
}

Shopify.prototype = {

  initialize: function () {},

  getApiField: function (key) {
    return this._api[key];
  },

  _setHostname: function (shopUrl, auth) {
    this._setApiField('hostname', shopUrl);
  },

  _prepResources: function () {
    for (var name in resources) {
      // this conditional is temporary...
      // will be removed when I finish all the resources
      if ('string' !== typeof resources[name]) {
        this[
          name[0].toLowerCase() + name.substring(1)
        ] = new resources[name](this);
      }
    }
  },

  _setApiField: function(key, value) {
    this._api[key] = value;
  }
};

module.exports = Shopify;