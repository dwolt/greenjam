'use strict';

var _ = require('lodash');
var Inventory = require('./Inventory.model');

//To see the virtuals in your JSON.stringify output, add the `toJSON: {
//virtuals: true }` option.
//https://groups.google.com/forum/?fromgroups#!searchin/mongoose-orm/virtual$20collection/mongoose-orm/hLe1cL1NWgU/awJtQdKBglEJ
//SomeSchema.set('toJSON', {
//   virtuals: true
//});

// Get list of Inventorys
// modified to add req.query
exports.index = function(req, res) {
  Inventory.find(req.query, function (err, Inventorys) {
    if(err) { return handleError(res, err); }
    return res.json(200, Inventorys);
  });
};

// Get a single Inventory
exports.show = function(req, res) {
  Inventory.findById(req.params.id, function (err, Inventory) {
    if(err) { return handleError(res, err); }
    if(!Inventory) { return res.send(404); }
    return res.json(Inventory);
  });
};

// Creates a new Inventory in the DB.
exports.create = function(req, res) {
  Inventory.create(req.body, function(err, Inventory) {
    if(err) { return handleError(res, err); }
    return res.json(201, Inventory);
  });
};

// Updates an existing Inventory in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  Inventory.findById(req.params.id, function (err, Inventory) {
    if (err) { return handleError(res, err); }
    if(!Inventory) { return res.send(404); }
    var updated = _.merge(Inventory, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, Inventory);
    });
  });
};

// Deletes a Inventory from the DB.
exports.destroy = function(req, res) {
  Inventory.findById(req.params.id, function (err, Inventory) {
    if(err) { return handleError(res, err); }
    if(!Inventory) { return res.send(404); }
    Inventory.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
