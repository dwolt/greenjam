'use strict';

var _ = require('lodash');
var AppMu = require('./AppMu.model');

// Get list of AppMus
exports.index = function(req, res) {
  AppMu.find(function (err, AppMus) {
    if(err) { return handleError(res, err); }
    return res.json(200, AppMus);
  });
};

// Get a single AppMu
exports.show = function(req, res) {
  AppMu.findById(req.params.id, function (err, AppMu) {
    if(err) { return handleError(res, err); }
    if(!AppMu) { return res.send(404); }
    return res.json(AppMu);
  });
};

// Creates a new AppMu in the DB.
exports.create = function(req, res) {
  AppMu.create(req.body, function(err, AppMu) {
    if(err) { return handleError(res, err); }
    return res.json(201, AppMu);
  });
};

// Updates an existing AppMu in the DB.
exports.update = function(req, res) {
  if(req.body._id) { delete req.body._id; }
  AppMu.findById(req.params.id, function (err, AppMu) {
    if (err) { return handleError(res, err); }
    if(!AppMu) { return res.send(404); }
    var updated = _.merge(AppMu, req.body);
    updated.save(function (err) {
      if (err) { return handleError(res, err); }
      return res.json(200, AppMu);
    });
  });
};

// Deletes a AppMu from the DB.
exports.destroy = function(req, res) {
  AppMu.findById(req.params.id, function (err, AppMu) {
    if(err) { return handleError(res, err); }
    if(!AppMu) { return res.send(404); }
    AppMu.remove(function(err) {
      if(err) { return handleError(res, err); }
      return res.send(204);
    });
  });
};

function handleError(res, err) {
  return res.send(500, err);
}