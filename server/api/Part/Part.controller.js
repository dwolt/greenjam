'use strict';

var _ = require('lodash');
var Part = require('./Part.model');

// Get list of Parts
exports.index = function(req, res) {
  Part.find(req.query, function (err, Parts) {
    if(err) { return handleError(res, err); }
    return res.json(200, Parts);
  });
};

// Get a single Part
exports.show = function(req, res) {
  Part.findById(req.params.id, function (err, Part) {
    if(err) { return handleError(res, err); }
    if(!Part) { return res.send(404); }
    return res.json(Part);
  });
};

// Creates a new Part in the DB.
exports.create = function(req, res) {
  Part.create(req.body, function(err, Part) {
    if(err) { return handleError(res, err); }
    return res.json(201, Part);
  });
};

// Updates an existing Part in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Part.findById(req.params.id, function (err, Part) {
    if (err) { return handleError(res, err); }
    if(!Part) { return res.send(404); }
    var updated = _.merge(Part, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Part);
    });
  });
};

// Deletes a Part from the DB.
exports.destroy = function(req, res) {
  Part.findById(req.params.id, function (err, Part) {
    if(err) { return handleError(res, err); }
    if(!Part) { return res.send(404); }
    Part.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
