'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

// mongoose.models = {};
// mongoose.modelSchemas = {};

var PartSchema = new Schema({
    //EXAMPLE from SP:  ABEXX*4515Q
    _id: String,
    vmrsNbr: String,
    partDescription: String,
    lastMaint: String,
    altType: String,
    altPtr: String,
    partType: String,
    isTemp: Boolean,
    isUsed: Boolean,
    isSerial: Boolean,
    barCodeNbr: String,
    unit: String,
    masterPack: String,
    exactPartNbr: String,
    classCode: String,
    active: String,
    stock: String,
    stampVersion: Number,
    stampCreatedDateTime: Date,
    stampCreatedUser: String,
    stampCreatedProcess: String,
    stampCreatedSession: String,
    stampLastChangeDateTime: Date,
    stampLastChangeUser: String,
    stampLastChangeProcess: String,
    stampLastChangeSession: String
  },
  {
    collection: 'Parts'
  });

//partBrand is the first part of the two-part key
PartSchema.virtual('partBrand').get(function() {
  return this._id.substring(0,this._id.indexOf("*"));
});
//partNumber is the second part of the two-part key
PartSchema.virtual('partNumber').get(function() {
  return this._id.substring(this._id.indexOf("*") + 1);
});

PartSchema.set('toJSON', {
  virtuals: true,
  getters: true
});

PartSchema.set('toObject', {
  virtuals: true,
  getters: true
});

module.exports = mongoose.model('Part', PartSchema);
