# Shopify NodeJS Bindings

Currently very early stage. Much of the code was adapted from [stripe-node](https://github.com/stripe/stripe-node).

## Installation

``` TODO ```

## Shopify API Documentation

Documentation is available at http://docs.shopify.com/api

## API Overview

Every resource is accessed through your ```shopify``` instance:

```
var auth = {};

// auth.method can be `oauth` or `basic`
auth.method = 'basic';

// if auth.method is `basic`, auth.token is a `apiKey:password` string
// if auth.method is `oauth`, auth.token is your accessToken
auth.token = 'kjdsnaiu92malfj1:jafgdqmim1utomlp0';

// get the shopify instance
var shopify = require('shopify')(auth, 'yourshopname')
```

## Configuration

- ```shopify.setAuthMethod('basic||oauth')```

Your authentication method should be either 'basic' or 'oauth'.

- ```shopify.setAuthToken('your auth token')```

If your authentication method is 'basic', then your token is a string of your API Key 
and password joined by a colon (:) so that it looks like ```yourApiKey:yourPassword```

If your authentication method is `oauth`, then your token is your OAuth accessToken.

- ```shopify.setTimeout(10000)``` default is node's default: 120000ms