'use strict';

var http = require('http')
  , https = require('https')
  , path = require('path')
  , when = require('when');

var utils = require('./utils');

// Use custom Error
var _Error = require('./Error');

var hasOwn = {}.hasOwnProperty;

// Provide extension mechanism for Stripe Resource Sub-Classes
ShopifyResource.extend = utils.protoExtend;

// Expose method-creator & prepared (basic) methods
ShopifyResource.method = require('./ShopifyMethod');
ShopifyResource.BASIC_METHODS = require('./ShopifyMethod.basic');

/**
 * Encapsulates request logic for a Shopify Resource
 */
function ShopifyResource (shopify, urlData) {
  
  this._shopify = shopify;
  this._urlData = urlData || {};

  // console.log('**** ShopifyResource');
  // console.log(this);

  this.basePath = utils.makeInterpolator(shopify.getApiField('basePath'));
  this.path = utils.makeInterpolator(this.path);

  // console.log('**** ShopifyResource');
  // console.log(this.basePath(), this.path(), urlData);

  if (this.includeBasic) {
    this.includeBasic.forEach(function(methodName) {
      this[methodName] = ShopifyResource.BASIC_METHODS[methodName];
    }, this);
  }

  this.initialize.apply(this, arguments);
}

ShopifyResource.prototype = {
  path: '',

  initialize: function () {},

  createFullPath: function(commandPath, urlData) {
    var fullpath;
    
    commandPath = typeof commandPath === 'function' ?
        commandPath(urlData) : commandPath

    fullpath = path.join(
      this.basePath(urlData),
      this.path(urlData),
      commandPath
    ).replace(/\\/g, '/'); // ugly workaround for Windows

    return fullpath + '.json';
  },

  createUrlData: function() {
    var urlData = {};
    // Merge in baseData
    for (var i in this._urlData) {
      if (hasOwn.call(this._urlData, i)) {
        urlData[i] = this._urlData[i];
      }
    }
    return urlData;
  },

  createDeferred: function (callback) {
    var deferred = when.defer();

    if (callback) {
      // Callback, if provided, is a simply translated to Promise'esque:
      // (Ensure callback is called outside of promise stack)
      deferred.promise.then(function (res) {
        setTimeout(function () {
          callback(null, res);
        }, 0);
      }, function (err) {
        setTimeout(function () {
          callback(err, null);
        }, 0);
      });
    }

    return deferred;
  },

  _responseHandler: function(req, callback) {
    var self = this;
    return function(res) {
      var response = '';

      res.setEncoding('utf8');
      res.on('data', function(chunk) {
        response += chunk;
      });
      res.on('end', function() {
        try {
          response = JSON.parse(response);
          if (response.error) {
            var err;
            err = _Error.ShopifyError.generate(response.error);
            return callback.call(self, err, null);
          }
        } catch (e) {
          return callback.call(
            self,
            new _Error.ShopifyAPIError({
              message: 'Invalid JSON received from the Shopify API'
            }),
            null
          );
        }
        callback.call(self, null, response);
      });
    };
  },

  _errorHandler: function (req, callback) {
    var self = this;
    return function (error) {
      if (req._isAborted) return; // already handled
      callback.call(
        self,
        new _Error.ShopifyConnectionError({
          message: 'An error occurred with our connection to Shopify',
          detail: error
        }),
        null
      );
    };
  },

  _request: function (method, path, data, auth, callback) {

    var requestData = utils.stringifyRequestData(data || {});
    var self = this;
    
    // console.log('**** ShopifyResource - _request - method, path, data, requestData');
    // console.log(method, path, data, requestData);

    function makeRequest () {

      // var timeout = self._shopify.getApiField('timeout');

      var options = {
        hostname: self._shopify.getApiField('hostname'),
        path: path,
        method: method,
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/x-www-form-urlencoded',
          'Content-Length': requestData.length,
        }
      };

      // set basic auth...
      if ('basic' === auth.method) {
        options.auth = auth.token;
      }
      // if oauth use the X-Shopify-Access-Token header
      // @see http://docs.shopify.com/api/tutorials/oauth
      else if ('oauth' === auth.method) {
        options.headers['X-Shopify-Access-Token'] = auth.token;
      }

      var req = https.request(options);

      // req.setTimeout(timeout, self._timeoutHandler(timeout, req, callback));
      req.on('response', self._responseHandler(req, callback));
      req.on('error', self._errorHandler(req, callback));

      req.write(requestData);
      req.end();
    }

    makeRequest();
  }
};

module.exports = ShopifyResource;