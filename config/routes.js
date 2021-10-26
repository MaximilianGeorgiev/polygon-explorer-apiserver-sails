/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` your home page.            *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': { view: 'pages/homepage' },

  'GET /addresses/:address': { controller: 'AddressController', action: 'getAccountBalance' },

  'GET /blocks/latest': { controller: 'BlockController', action: 'getLatestBlock' },
  'GET /blocks/pending': { controller: 'BlockController', action: 'getPendingBlocks' },
  'GET /blocks/identifier/:id': { controller: 'BlockController', action: 'getBlockByIdentifier' },
  'GET /blocks/:from/:count': { controller: 'BlockController', action: 'getMultipleBlocksAfterThreshold' },

  'GET /transactions/latest': { controller: 'TransactionController', action: 'getLatestTransaction' },
  'GET /transactions/pending': { controller: 'TransactionController', action: 'getPendingTransactions' },
  'GET /transactions/hash/:hash': { controller: 'TransactionController', action: 'getTransactionByHash' },
  'GET /transactions/address/:address': { controller: 'TransactionController', action: 'getAddressTxCount' }


  /***************************************************************************
  *                                                                          *
  * More custom routes here...                                               *
  * (See https://sailsjs.com/config/routes for examples.)                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the routes in this file, it   *
  * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
  * not match any of those, it is matched against static assets.             *
  *                                                                          *
  ***************************************************************************/


};
