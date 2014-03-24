'use strict';

var utils = require('./utils');

/**
 * Create an API method from the declared spec.
 *
 * @param [spec.method='GET'] 
 *  Request Method (POST, GET, DELETE, PUT)
 * @param [spec.path=''] 
 *  Path to be appended to the API BASE_PATH, joined with 
 *  the instance's path (e.g. "charges" or "customers")
 * @param [spec.required=[]] 
 *  Array of required arguments in the order that they
 *  must be passed by the consumer of the API. Subsequent optional arguments are
 *  optionally passed through a hash (Object) as the penultimate argument
 *  preceeding the also-optional callback argument
 */
module.exports = function shopifyMethod (spec) {

  var commandPath = utils.makeInterpolator( spec.path || '' );
  var requestMethod = (spec.method || 'GET').toUpperCase();
  var urlParams = spec.urlParams || [];

  // console.log('**** shopifyMethod commandPath,urlParams');
  // console.log(commandPath, urlParams);

  return function () {
  
    var self = this;
    var args = [].slice.call(arguments);

    // console.log('**** shopifyMethod args');
    // console.log(args);

    var callback = typeof args[args.length - 1] === 'function' && args.pop();
    var auth = self._shopify.getApiField('auth');
    var data = utils.isObject(args[args.length - 1]) ? args.pop() : {};
    var urlData = this.createUrlData();

    var deferred = this.createDeferred(callback);

    for (var i = 0, l = urlParams.length; i < l; ++i) {
      var arg = args[0];
      if (urlParams[i] && !arg) {
        throw new Error('Shopify: I require argument "' + urlParams[i] + '", but I got: ' + arg);
      }
      urlData[urlParams[i]] = args.shift();
    }

    var requestPath = this.createFullPath(commandPath, urlData);

    // console.log('**** shopifyMethod requestPath');
    // console.log(requestPath, data);

    self._request(requestMethod, requestPath, data, auth, function (err, response) {
      if (err) {
        deferred.reject(err);
      } else {
        deferred.resolve(
          spec.transformResponseData ?
            spec.transformResponseData(response) :
            response
        );
      }
    });

    return deferred.promise;
  };
};