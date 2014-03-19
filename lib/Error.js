'use strict';

var utils = require('./utils');

/**
 * Generic Error klass to wrap any errors returned by shopify-node
 */
function _Error (raw) {
  /*jshint validthis:true, unused:false */
  this.populate.apply(this, arguments);
}

// Extend Native Error
_Error.prototype = Object.create(Error.prototype);

_Error.prototype.type = 'GenericError';
_Error.prototype.populate = function(type, message) {
  this.type = type;
  this.message = message;
};

_Error.extend = utils.protoExtend;

/**
 * Create subclass of internal Error klass
 * (Specifically for errors returned from Shopify's REST API)
 */
var ShopifyError = _Error.ShopifyError = _Error.extend({
  type: 'ShopifyError',
  populate: function (raw) {

    // Move from prototype def (so it appears in stringified obj)
    this.type = this.type;

    this.rawType = raw.type;
    this.code = raw.code;
    this.param = raw.param;
    this.message = raw.message;
    this.detail = raw.detail;
    this.raw = raw;

  }
});

/**
 * Helper factory which takes raw shopify errors and outputs wrapping instances
 */
ShopifyError.generate = function (rawShopifyError) {
  switch (rawShopifyError.type) {
    case 'invalid_request_error':
      return new _Error.StripeInvalidRequestError(rawShopifyError);
    case 'api_error':
      return new _Error.StripeAPIError(rawShopifyError);
  }
  return new _Error('Generic', 'Unknown Error');
};

// Specific Shopify Error types:
_Error.StripeInvalidRequestError = ShopifyError.extend({ type: 'ShopifyInvalidRequest' });
_Error.ShopifyAPIError = ShopifyError.extend({ type: 'ShopifyAPIError' });
_Error.ShopifyConnectionError = ShopifyError.extend({ type: 'ShopifyConnectionError' });

module.exports = _Error;