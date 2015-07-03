/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/VmrsBrands', require('./api/VmrsBrand'));
  app.use('/api/Parts', require('./api/Part'));
  app.use('/api/Locations', require('./api/Location'));
  app.use('/api/Inventorys', require('./api/Inventory'));
  app.use('/api/AppMus', require('./api/AppMu'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
