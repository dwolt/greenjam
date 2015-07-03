'use strict';

var _ = require('lodash');
var VmrsBrand = require('./VmrsBrand.model');

exports.index = function(req, res) {
  var filter = req.query,
    fields = {},
    idLike = req.query.idlike || '';
  if (idLike) {
    idLike = idLike.toUpperCase();
    var regex = new RegExp("^" + idLike, "i");
    filter = {_id: {$regex: regex}};
    fields = {_id: 1};
  }
  VmrsBrand.find(filter, fields, function (err, VmrsBrands) {
    if(err) { return handleError(res, err); }
    return res.json(200, VmrsBrands);
  });
};

// Get a single VmrsBrand
exports.show = function(req, res) {
  VmrsBrand.findById(req.params.id, function (err, VmrsBrand) {
    if(err) { return handleError(res, err); }
    if(!VmrsBrand) { return res.send(404); }
    return res.json(VmrsBrand);
  });
};

// Creates a new VmrsBrand in the DB.
exports.create = function(req, res) {
  VmrsBrand.create(req.body, function(err, VmrsBrand) {
    if(err) { return handleError(res, err); }
    return res.json(201, VmrsBrand);
  });
};

// Updates an existing VmrsBrand in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  VmrsBrand.findById(req.params.id, function (err, VmrsBrand) {
    if (err) { return handleError(res, err); }
    if(!VmrsBrand) { return res.send(404); }
    var updated = _.merge(VmrsBrand, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, VmrsBrand);
    });
  });
};

// Deletes a VmrsBrand from the DB.
exports.destroy = function(req, res) {
  VmrsBrand.findById(req.params.id, function (err, VmrsBrand) {
    if(err) { return handleError(res, err); }
    if(!VmrsBrand) { return res.send(404); }
    VmrsBrand.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
