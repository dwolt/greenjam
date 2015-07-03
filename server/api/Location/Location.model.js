'use strict';

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var LocationSchema = new Schema({
    _id: String,
    name: String,
    address: String,
    city: String,
    state: String,
    zip: String,
    contactList: [
      {
        phones: String,
        contacts: String
      }
    ],
    county: String,
    locCode: String,
    partsRoom: String,
    shopSchedule: [
      {
        shopHours: Number,
        holidays: String,
        startTimes: String,
        endTimes: String
      }
    ],
    // startDate: Date,
    // lastMaint: Date,
    startDate: String,
    lastMaint: String,
    shopSupplies: String,
    laborPricing: String,
    role: String,
    region: String,
    shipName: String,
    shipCity: String,
    shipState: String,
    shipZip: String,
    shipCounty: String
  },
  {
    collection: 'Locations'
  });

module.exports = mongoose.model('Location', LocationSchema);
