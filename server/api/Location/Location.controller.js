'use strict';

var _ = require('lodash');
var Location = require('./Location.model');

// Get list of Locations
exports.index = function(req, res) {
  Location.find(req.query,function (err, Locations) {
    if(err) { return handleError(res, err); }
    return res.json(200, Locations);
  });
};

// Get a single Location
exports.show = function(req, res) {
  Location.findById(req.params.id, function (err, Location) {
    if(err) { return handleError(res, err); }
    if(!Location) { return res.send(404); }
    return res.json(Location);
  });
};

// Creates a new Location in the DB.
exports.create = function(req, res) {
  Location.create(req.body, function(err, Location) {
    if(err) { return handleError(res, err); }
    return res.json(201, Location);
  });
};

// Updates an existing Location in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Location.findById(req.params.id, function (err, Location) {
    if (err) { return handleError(res, err); }
    if(!Location) { return res.send(404); }
    var updated = _.merge(Location, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Location);
    });
  });
};

// Deletes a Location from the DB.
exports.destroy = function(req, res) {
  Location.findById(req.params.id, function (err, Location) {
    if(err) { return handleError(res, err); }
    if(!Location) { return res.send(404); }
    Location.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
